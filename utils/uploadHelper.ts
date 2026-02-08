import { supabaseUrl, supabaseAnonKey } from './supabase';

/**
 * Uploads a file to Supabase Storage with progress tracking.
 */
export const uploadWithProgress = (
    bucket: string,
    path: string,
    file: Blob | File,
    onProgress: (progress: number) => void
): Promise<string> => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const url = `${supabaseUrl}/storage/v1/object/${bucket}/${path}`;

        xhr.open('POST', url, true);
        xhr.setRequestHeader('Authorization', `Bearer ${supabaseAnonKey}`);
        xhr.setRequestHeader('apikey', supabaseAnonKey);

        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
                const percentComplete = Math.round((event.loaded / event.total) * 100);
                onProgress(percentComplete);
            }
        };

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(path);
            } else {
                reject(new Error(`Upload failed with status ${xhr.status}: ${xhr.responseText}`));
            }
        };

        xhr.onerror = () => reject(new Error('XMLHttpRequest error'));

        // We use FormData if it's a multi-part upload, 
        // but for Supabase it's usually just the raw body.
        xhr.send(file);
    });
};
