// api/upload-to-bitrix.js
// Vercel Serverless Function to upload files to Bitrix24

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb', // Allow large file uploads
    },
  },
};

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { files, dealId, webhook } = req.body;

    if (!files || !Array.isArray(files) || files.length === 0) {
      return res.status(400).json({ error: 'No files provided' });
    }

    if (!dealId) {
      return res.status(400).json({ error: 'No deal ID provided' });
    }

    if (!webhook) {
      return res.status(400).json({ error: 'No webhook provided' });
    }

    console.log(`📎 Processing ${files.length} files for deal ${dealId}`);

    const uploadedFiles = [];
    const errors = [];

    // Upload each file to Bitrix24
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      try {
        console.log(`⬆️ Uploading file ${i + 1}/${files.length}: ${file.name}`);

        // Method 1: Try uploading to Bitrix24 storage first
        const uploadResponse = await fetch(`${webhook}disk.storage.uploadfile`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: 'b1', // Default storage
            data: {
              NAME: file.name
            },
            fileContent: [file.name, file.data] // [filename, base64]
          })
        });

        const uploadResult = await uploadResponse.json();

        if (uploadResult.result && uploadResult.result.ID) {
          console.log(`✅ File uploaded to storage: ${file.name} (ID: ${uploadResult.result.ID})`);
          
          uploadedFiles.push({
            name: file.name,
            size: file.size,
            id: uploadResult.result.ID,
            downloadUrl: uploadResult.result.DOWNLOAD_URL
          });
        } else {
          // Method 2: Try direct field upload as fallback
          console.log(`⚠️ Storage upload failed, trying direct field upload for: ${file.name}`);
          
          uploadedFiles.push({
            name: file.name,
            size: file.size,
            base64: file.data,
            fallback: true
          });
        }

      } catch (error) {
        console.error(`❌ Error uploading ${file.name}:`, error.message);
        errors.push({
          file: file.name,
          error: error.message
        });
      }
    }

    // Now attach uploaded files to the deal
    if (uploadedFiles.length > 0) {
      try {
        // Method 1: Try attaching via activity
        const fileIds = uploadedFiles
          .filter(f => f.id && !f.fallback)
          .map(f => f.id);

        if (fileIds.length > 0) {
          console.log(`📎 Attaching ${fileIds.length} files to deal ${dealId} via activity`);

          const activityResponse = await fetch(`${webhook}crm.activity.add`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              fields: {
                OWNER_TYPE_ID: 2, // Deal
                OWNER_ID: dealId,
                TYPE_ID: 4,
                SUBJECT: 'Issue Report Photos/Videos',
                DESCRIPTION: `${fileIds.length} file(s) attached from issue report`,
                FILES: fileIds.map(id => id),
                COMPLETED: 'Y',
                RESPONSIBLE_ID: 1
              }
            })
          });

          const activityResult = await activityResponse.json();
          
          if (activityResult.result) {
            console.log(`✅ Files attached via activity ID: ${activityResult.result}`);
          }
        }

        // Method 2: Also try to update deal with file field (for fallback files)
        const base64Files = uploadedFiles
          .filter(f => f.fallback && f.base64)
          .map(f => [f.name, f.base64]);

        if (base64Files.length > 0) {
          console.log(`📎 Updating deal with ${base64Files.length} files via field`);

          const updateResponse = await fetch(`${webhook}crm.deal.update`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: dealId,
              fields: {
                UF_CRM_FILES: base64Files
              }
            })
          });

          const updateResult = await updateResponse.json();
          console.log('Deal update result:', updateResult);
        }

      } catch (error) {
        console.error('❌ Error attaching files to deal:', error.message);
        errors.push({
          step: 'attachment',
          error: error.message
        });
      }
    }

    // Return results
    return res.status(200).json({
      success: true,
      uploaded: uploadedFiles.length,
      files: uploadedFiles,
      errors: errors.length > 0 ? errors : undefined
    });

  } catch (error) {
    console.error('❌ Server error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
