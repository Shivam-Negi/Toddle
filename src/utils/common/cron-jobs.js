const cron = require('node-cron');
const { Post } = require('../../models')

function scheduleCrons() {
    cron.schedule('* * * * *', async () => {
        console.log('Running a task every minute');
        
        const now = new Date();
        
        const postsToPublish = await Post.findAll({
          where: {
            isScheduled: true,
            scheduledAt: {
              [Op.lte]: now
            }
          }
        });
        
        for (const post of postsToPublish) {
          post.isScheduled = false;
          await post.save();
        }
      
        console.log(`${postsToPublish.length} posts published.`);
      });
}

module.exports = scheduleCrons;

