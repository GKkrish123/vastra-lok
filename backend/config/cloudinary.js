import {v2 as cloudinary} from "cloudinary"

const connectCloudinary = async () => {
    cloudinary.config({
        cloud_name: "dpxr6dydh",
        api_key: "817696461928669",
        api_secret: "Uj8htyANksdSXzCoJEhZbK0SJII"
    })
}

export default connectCloudinary