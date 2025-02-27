const cron = require('node-cron');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.autoDeletion = cron.schedule('0 0 */2 * *', async () => {
    console.log('Task is running every 2 days');
    await prisma.blacklistedToken.deleteMany({
        where: {
            createdAt: {
                lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
            }
        }
    });
}, { scheduled: true });

