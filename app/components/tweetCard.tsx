import { PublicKey } from "@solana/web3.js";
import Link from "next/link";
import { Card } from "react-bootstrap";

interface TweetProps {
    tweet: any
}

const TweetCard = (props: TweetProps) => {

    const tweet = props.tweet;
    const dataAccount: PublicKey = tweet.publicKey.toBase58();
    const author = tweet.account.author.toBase58();
    const topic = tweet.account.topic;
    const timestamp = tweet.account.timestamp;
    const content = tweet.account.content;
    

    const href = `https://solscan.io/account/${dataAccount}?cluster=devnet`;

    return (
        <>
        <div className="row d-flex justify-content-center my-3">
            <div className="col-md-7 bg-info bg-opacity-10 rounded p-5">
    <Card >
      <Card.Body>
        <Card.Title>{topic || ""}</Card.Title>
        {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
        <Card.Text>
          {content}
        </Card.Text>
        <Link href={href}>
        <a target="_blank">View on solana explorer</a>
        </Link>
        {/* <blockquote className="blockquote mb-0"> */}
          <p>
           Author : {' '}
           {author}{' '}
          </p>
          <footer className="blockquote-footer">
            <cite title="Source Title">{timestamp.toString()}</cite>
          </footer>
        {/* </blockquote> */}
      </Card.Body>
    </Card>
    </div>
    </div>
        </>
    )
}

export default TweetCard;