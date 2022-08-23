import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import TweetCard from "../components/tweetCard";
import { fetchTweet, filterData } from "../lib/fetchTweet";
import { useWalletHook } from "../lib/useWalletHook";

const index: NextPage = () => {

  const {program} = useWalletHook();
  const [allTweet, setAllTweet] = useState([]);
  const [author, setAuthor] = useState("");

  useEffect(()=> {
    fetchTweet(program).then((data: any) => {
      console.log("data is", data)
      setAllTweet(data);
    })
    console.log("program", program)
  }, [])

  const filterTweet = (e: any) => {
    e.preventDefault()
    fetchTweet(program, [filterData(author)]).then((data: any) => {
      console.log("data is", data)
      setAllTweet(data);
    })
  }

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

<div className="row d-flex justify-content-center my-3">
            <div className="col-md-7 bg-info bg-opacity-10 rounded p-5">
            <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control type="text" onChange={(e:any) => setAuthor(e.target.value)} placeholder="6HAgSokzJrNgtCHrHGimXDX5YkK2QnsFVkPPQRw13gx9" />
      </Form.Group>
      <Button onClick={filterTweet} type="submit">
       <i className="bi bi-funnel"> Filter </i>
        </Button>
    </Form>
              </div>
              </div>
    {allTweet.length > 0 && allTweet.map((ele: any, i: number) => {
      return <TweetCard tweet={ele} key={`tweet_${i}`} />
    })}
    </>
  )
   
}

export default index;