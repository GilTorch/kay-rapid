import { Platform } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';

export default async function uploadImageToFileServer(files, label, callback) {
    if (!files) return;
    for (let i = 0; i < files.length; i++) {
        const res = await RNFetchBlob.fetch("POST", "https://api.cloudinary.com/v1_1/dejyp5iex/image/upload?upload_preset=lakayou", {
            'Content-Type': 'multipart/form-data'
        }, [
                { name: 'file', filename: files[i].fileName, data: RNFetchBlob.wrap(files[i].uri) }
            ])

        const jsonResponse = res.json();
        callback(label, jsonResponse);
    }
}