export const CreateSuccess = (status, message, data) => {
    const successObj = {
        success: status,  // Changed from statusCode to status
        message: message,  // Changed from successMessage to message
        data: data
    }
    return successObj;  // Changed from return success to return successObj
}
