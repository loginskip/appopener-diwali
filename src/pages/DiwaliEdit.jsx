import { Component } from "react";
import React from "react";
import classes from "../components/Styles.module.css";
import "../css/splash.css";
import html2canvas from "html2canvas";
import { db, storage } from "../components/Firebase";
import { ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { customAlphabet } from "nanoid";

import DiwaliCard1 from "../assets/diwali_card.jpg";
import DiwaliCard2 from "../assets/diwali_card_2.jpg";
import DiwaliCard3 from "../assets/diwali_card_3.jpg";
import DiwaliCard4 from "../assets/diwali_card_4.jpg";

const imagesList = [
  { id: 1, imgUrl: DiwaliCard1 },
  { id: 2, imgUrl: DiwaliCard2 },
  { id: 3, imgUrl: DiwaliCard3 },
  { id: 4, imgUrl: DiwaliCard4 },
];

const nanoid = customAlphabet("1234567890abcdef", 10);

class DiwaliEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardName: "",
      nameOncard: "",
      selectedImg: imagesList[0],
      userImage: "",
      imageID: "",
      imageBlob: "",
      isEdit: false,
    };
    this.handleCardCreation = this.handleCardCreation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCardDownload = this.handleCardDownload.bind(this);
    this.handleCardShare = this.handleCardShare.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.userImageChange = this.userImageChange.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);

    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);

    this.startX = null;
    this.currentX = null;
    this.activeSwipe = null;
  }

  componentDidMount() {
    let userName = this.props.match.params.name;
    if (userName.length) this.setState({ nameOncard: userName });
  }

  handleEdit() {
    this.setState({ isEdit: true });
  }

  handleChange(e) {
    this.setState({ cardName: e.target.value });
  }

  handleCardCreation(e) {
    e.preventDefault();
    if (this.state.cardName.length) {
      this.setState({ nameOncard: this.state.cardName });
      this.setState({ cardName: "" });
    }
  }

  handlePrev() {
    if (this.state.selectedImg.id === 1) {
      this.setState({ selectedImg: imagesList[imagesList.length - 1] });
    } else {
      this.setState({ selectedImg: imagesList[this.state.selectedImg.id - 2] });
    }
  }

  handleNext() {
    if (this.state.selectedImg.id === imagesList.length) {
      this.setState({ selectedImg: imagesList[0] });
    } else {
      this.setState({ selectedImg: imagesList[this.state.selectedImg.id] });
    }
  }

  handleTouchStart(e) {
    this.startX = e.touches[0].clientX;
    this.activeSwipe = null;
  }

  handleTouchMove(e) {
    if (!this.startX) {
      return;
    }

    this.currentX = e.touches[0].clientX;
    const deltaX = this.currentX - this.startX;

    if (deltaX > 50) {
      this.activeSwipe = "right";
    } else if (deltaX < -50) {
      this.activeSwipe = "left";
    }
  }

  handleTouchEnd() {
    if (this.activeSwipe === "right") {
      this.handlePrev();
    } else if (this.activeSwipe === "left") {
      this.handleNext();
    }

    this.startX = null;
    this.currentX = null;
    this.activeSwipe = null;
  }

  userImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      if (file.size <= 100 * 1024) {
        this.setState({ userImage: file });
        const reader = new FileReader();
        reader.onload = () => {
          const blob = new Blob([reader.result], { type: file.type });
          this.setState({ imageBlob: blob });
        };
        reader.readAsArrayBuffer(file);
      }
    }
  }

  async handleImageUpload() {
    const file = this.state.userImage;
    if (file) {
      // if (file.size <= 100 * 1024) {
        const id = nanoid();
        const storageRef = ref(storage, `images/${id}`);
        await uploadBytes(storageRef, file);

        return id;
      // }
    }
  }

  async handleCardShare() {
    const collRef = collection(db, "users");
    let imageId = "";
    if (this.state.userImage) {
      imageId = await this.handleImageUpload();
    }
    const docSnap = await addDoc(collRef, {
      name: this.state.nameOncard,
      card: this.state.selectedImg.id,
      userImage: imageId,
    });
    const docId = docSnap.id;

    if (navigator.canShare) {
      await navigator.share({
        // title: "Appopener",
        // text: "Happy Diwali !",
        url: `${window.location.origin}/wish/${docId}`,
      });
    } else {
      alert("Web Share supported on this browser.");
      console.log("Web Share supported on this browser.");
    }
  }

  async handleCardDownload() {
    const element = document.getElementById("diwaliCard");
    const canvas = await html2canvas(element);
    const compressedCanvas = document.createElement("canvas");
    compressedCanvas.width = canvas.width;
    compressedCanvas.height = canvas.height;
    const ctx = compressedCanvas.getContext("2d");
    ctx.drawImage(canvas, 0, 0);
    const imgData = compressedCanvas.toDataURL("image/jpeg", 1);
    const downloadLink = document.createElement("a");
    downloadLink.href = imgData;
    downloadLink.download = `${this.state.nameOncard}.png`;
    downloadLink.click();
  }

  render() {
    return (
      <div
        className={classes.diwali_page}
        style={{ paddingBottom: this.state.isEdit && "3rem" }}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
      >
        {this.state.isEdit && (
          <div className={classes.card_form_container}>
            <div className={classes.card_form}>
              <h3>Generate Diwali Card</h3>
              <form onSubmit={this.handleCardCreation}>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={this.state.cardName}
                  onChange={this.handleChange}
                />
                <input type="file" onChange={this.userImageChange} />
                <div className={classes.button_container}>
                  <button>Generate</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {this.state.nameOncard.length ? (
          <>
            <div className={classes.card_main}>
              {this.state.isEdit ? (
                <>
                  <button
                    className={classes.changeImageButton}
                    onClick={this.handlePrev}
                  >
                    &#8249;
                  </button>
                  <div className={classes.diwali_card}>
                    <div id="diwaliCard" className={classes.card_container}>
                      {this.state.imageBlob && (
                        <div className={classes.user_image_container}>
                          <img
                            src={URL.createObjectURL(this.state.imageBlob)}
                            alt=""
                          />
                        </div>
                      )}
                      <img src={this.state.selectedImg.imgUrl} alt="" />
                      <div
                        className={classes.card_content}
                        style={{
                          top: this.state.imageBlob ? "140px" : "120px",
                        }}
                      >
                        <p className={classes.nameOnCard}>
                          {this.state.nameOncard}
                        </p>
                        <p className={classes.wishes}>Wishes you</p>
                        <p className={classes.happy}>HAPPY</p>
                        <p className={classes.diwali}>Diwali</p>
                        <p className={classes.message}>
                          With the shining of diyas and the echoes of the
                          chants, may prosperity and happiness of the festival
                          of lights fill our lives.
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    className={classes.changeImageButton}
                    onClick={this.handleNext}
                  >
                    &#8250;
                  </button>
                </>
              ) : (
                <div className={classes.send_container}>
                  <div className={classes.diwali_card}>
                    <div id="diwaliCard" className={classes.card_container}>
                      <img src={this.state.selectedImg.imgUrl} alt="" />
                      <div
                        className={classes.card_content}
                        style={{ top: "18vh" }}
                      >
                        <p className={classes.nameOnCard}>
                          {" "}
                          {this.state.nameOncard}
                        </p>
                        <p className={classes.wishes}>Wishes you</p>
                        <p className={classes.happy}>HAPPY</p>
                        <p className={classes.diwali}>Diwali</p>
                        <p className={classes.message}>
                          With the shining of diyas and the echoes of the
                          chants, may prosperity and happiness of the festival
                          of lights fill our lives.
                        </p>
                      </div>
                      <div className={classes.send_button}>
                        <button onClick={this.handleCardShare}>Share</button>
                        <button onClick={this.handleEdit}>Edit</button>
                        <button onClick={this.handleCardDownload}>
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {this.state.isEdit && (
              <div
                className={classes.button_container}
                style={{ marginTop: "10px" }}
              >
                <button onClick={this.handleCardShare}>Share</button>
                <button onClick={this.handleCardDownload}>Download</button>
              </div>
            )}
          </>
        ) : null}
      </div>
    );
  }
}

export default DiwaliEdit;