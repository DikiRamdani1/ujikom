import {app} from "./db"
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage"

const storage = getStorage(app)

export const saveImage = async (image) => {
    const storageRef = ref(storage, `images/${image.name}`)
    try {
        const snapshot = await uploadBytes(storageRef, image)
        const imageUrl = await getDownloadURL(snapshot.ref)
        return imageUrl
        
    } catch (error) {
        console.log(error)
    }
}