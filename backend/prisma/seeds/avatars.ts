import { userRepository } from "../../src/database/repository/userRepository"
import prisma from "../../src/utils/prisma"

const avatarList = [
    'default.jpg',
    'boar-spades.jpg',
    'crow-spades.jpg',
    'rabbit-clover.jpg',
    'rat-hearts.jpg',

]

export async function seedAvatars() {

    const existingAvatars = await prisma.avatar.findMany({
        where: {
            url: {
                in: avatarList
            }
        }
    })

    if (existingAvatars.length < 1) {
        console.log('No avatars found, seeding avatars.')
    }

    const existingAvatarNames = existingAvatars.map(avatar => avatar.url)
    const avatarsToSeed = avatarList.filter(avatar => !existingAvatarNames.includes(avatar))

    avatarsToSeed.forEach(async (avatar) => {
        userRepository.createAvatar(avatar)
    })
}
