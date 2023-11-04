import classes from "../components/Styles.module.css";
import { Link } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../components/Firebase";
import { useEffect, useState } from "react";

import DiwaliCard1 from "../assets/diwali_card1.jpg";
import DiwaliCard2 from "../assets/diwali_card_2.jpg";
import DiwaliCard3 from "../assets/diwali_card_3.jpg";
import DiwaliCard4 from "../assets/diwali_card_4.jpg";

const imagesList = [
  { id: 1, imgUrl: DiwaliCard1 },
  { id: 2, imgUrl: DiwaliCard2 },
  { id: 3, imgUrl: DiwaliCard3 },
  { id: 4, imgUrl: DiwaliCard4 },
];

export default function SharedCard(params) {
  const userId = params.match.params.id;

  const [userData, setUserData] = useState({
    name: "",
    card: 0,
    userImage: "",
  });
  const [userImageFile, setUserImageFile] = useState();

  useEffect(() => {
    async function getUserData() {
      try {
        const res = await getDoc(doc(db, "users", userId));
        const data = res.data();
        setUserData(data);
        if (data.userImage.length) {
          const storageRef = ref(storage, `images/${data.userImage}`);
          const imageUrl = await getDownloadURL(storageRef);
          setUserImageFile(imageUrl);
        }
      } catch (error) {
        console.log("getting user data error");
      }
    }

    getUserData();
  }, [userId]);

  return (
    <>
      <div className={classes.diwali_page}>
        {userData?.name && (
          <div className={classes.send_container}>
            <div className={classes.diwali_card}>
              <div id="diwaliCard" className={classes.card_container}>
                {userImageFile && (
                  <div
                    className={classes.user_image_container}
                    style={{ top: "15%" }}
                  >
                    <div
                      className={classes.image_Cont}
                      style={{ width: "60px", height: "60px" }}
                    >
                      <img src={userImageFile} alt="" />
                    </div>
                  </div>
                )}
                <img src={imagesList[userData?.card - 1].imgUrl} alt="" />
                <div
                  className={classes.card_content}
                  style={{ top: userImageFile ? "23%" : "18%" }}
                >
                  <p className={classes.nameOnCard}>{userData?.name}</p>
                  <p className={classes.wishes}>Wishes you</p>
                  <p className={classes.happy}>HAPPY</p>
                  <p className={classes.diwali}>Diwali</p>
                  <p className={classes.message}>
                    With the shining of diyas and the echoes of the chants, may
                    prosperity and happiness of the festival of lights fill our
                    lives.
                  </p>
                </div>
                <div className={classes.send_button}>
                  <Link to={`/happydiwali`}>
                    <button>Send Wishes</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
