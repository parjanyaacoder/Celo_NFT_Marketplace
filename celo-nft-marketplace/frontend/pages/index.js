import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Listing from "../components/Listing";
import { createClient } from "urql";
import styles from "../styles/Home.module.css"
import Link from "next/link";
import { SUBGRAPH_URL } from "../constants";
import { useAccount } from "wagmi"

export default function Home() {

 const [listings, setListings] = useState()
 const [loading, setLoading] = useState(false)
 
 const { isConnected } = useAccount();

 async function fetchListings() {
  setLoading(true);
  const listingsQuery = `query ListingsQuery {
    listingEntities {
      id,
      nftAddress,
      tokenId,
      price,
      seller,
      buyer
    }
  }`;

  const urqlClient = createClient({
    url: SUBGRAPH_URL
  });

  const response = await urqlClient.query(listingsQuery).toPromise();
  const listingEntities = response.data.listingEntities;

  const activeListing = listingEntities.filter(l => l.buyer === null)

  setListings(activeListing)
  setLoading(false)
 }

 useEffect(() => {
   if(isConnected) {
    fetchListings()
   }
 }, [])

 return (
  <>
    <Navbar />
    {loading && isConnected && <span>Loading...</span>}
    <div className={styles.container}>
      {!loading && listings && listings.map((listing) => {
        return (
          <Link 
            key={listing.key}
            href={`/${listing.nftAddress}/${listing.tokenId}`}>
              <a>
                <Listing 
                  nftAddress={listing.nftAddress}
                  tokenId={listing.tokenId}
                  price={listing.price}
                  seller={listing.seller} />
              </a>
            </Link>
        );
      })}
    </div>
    {!loading && listings && listings.length === 0 && (
      <span>No listings found</span>
    )}
  </>
 )

}