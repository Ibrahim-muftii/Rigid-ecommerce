'use server'

export async function getPhoneNumber() {
    return process.env.PHONE_NUMBER
}
