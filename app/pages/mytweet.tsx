import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import TweetCard from "../components/tweetCard";
import { fetchTweet, filterData } from "../lib/fetchTweet";
import { useWalletHook } from "../lib/useWalletHook";

const index: NextPage = () => {

  const {program, anchorWalletObj} = useWalletHook();
  const author = anchorWalletObj?.publicKey.toBase58()
  const [allTweet, setAllTweet] = useState([]);
//   const [author, setAuthor] = useState("");

  useEffect(()=> {
    fetchTweet(program, [filterData(author)]).then((data: any) => {
      console.log("data is", data)
      setAllTweet(data);
    })
    console.log("program", program)
  }, [])


  if(allTweet.length == 0) {
    return (
      <>
     <div className="containter p-5 m-5 bg-warning bg-opacity-10">
      <h3>Loading please wait...</h3>
     </div>
      </>
    )
  }

  return (
    <>
    {allTweet.length > 0 && allTweet.map((ele: any, i: number) => {
      return <TweetCard tweet={ele} key={`tweet_${i}`} />
    })}
    </>
  )
   
}

export default index;