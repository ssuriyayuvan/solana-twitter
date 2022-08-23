use anchor_lang::prelude::*;

declare_id!("6HAgSokzJrNgtCHrHGimXDX5YkK2QnsFVkPPQRw13gx9");

#[program]
pub mod twitter {
    use super::*;

    pub fn send_tweet(ctx: Context<TweetContext>, topic: String, content: String) -> Result<()> {

        if topic.chars().count() > 50 {
           return err!(TweetError::TopicTooLong);
        }
        if content.chars().count() > 50 {
            return err!(TweetError::ContentTooLong);
        }

        let tweet_account = &mut ctx.accounts.my_tweet;
        let signer  = &ctx.accounts.sender_of_tweet;
        let clock = Clock::get().unwrap();
        tweet_account.author = *signer.key;
        tweet_account.timestamp = clock.unix_timestamp;
        tweet_account.topic = topic;
        tweet_account.content = content;
        Ok(())
    }

    pub fn update_tweet(ctx: Context<UpdateTweet>, topic: String, content: String) -> Result<()> {
        if topic.chars().count() > 50 {
            return err!(TweetError::TopicTooLong);
         }
         if content.chars().count() > 50 {
             return err!(TweetError::ContentTooLong);
         }

        let tweet_account = &mut ctx.accounts.my_tweet;
        // let signer = &ctx.accounts.sender_of_tweet;
         tweet_account.topic = topic;
         tweet_account.content = content;



        Ok(())
    }
}

#[derive(Accounts)]
pub struct TweetContext<'info> {
    #[account(init, payer = sender_of_tweet, space = Tweet::LEN )]
    pub my_tweet : Account<'info,Tweet>,
    #[account(mut)]
    pub sender_of_tweet: Signer<'info>, // he is payer, so we can change his balance (i.e) #[account(mut)]
    pub system_program : Program<'info, System>
}

#[derive(Accounts)]
pub struct UpdateTweet<'info> {
    #[account(mut, has_one = author)]
    pub my_tweet : Account<'info, Tweet>,
    #[account(mut)]
    pub author: Signer<'info>,
}

#[account]
pub struct Tweet {
    pub author: Pubkey,
    pub timestamp: i64,
    pub topic: String,
    pub content: String
}

impl Tweet {
    const LEN: usize = 8 + 32 +8 + 200 + 720;
}

#[error_code]
pub enum TweetError {
    #[msg("Topic cannot be more than 50 words")]
    TopicTooLong,
    #[msg("Content cannot be more than 200 words")]
    ContentTooLong
}