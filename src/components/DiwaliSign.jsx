import { useState } from "react";

export default function DiwaliSign() {
  const [user, setUser] = useState({ name: "", phoneNo: "" });
  const [openLoginModal, setOpenLoginModal] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSaveUser = async (e) => {
    e.preventDefault();
    if (user.name) {
      window.open(`${window.location.origin}/diwali/${user.name}`, "_blank");
    }
  };

  return (
    <div className="FloatLoginComponent">
      {openLoginModal ? (
        <div className="FloatLoginComponent_modal">
          <button
            className="close_btn"
            onClick={() => setOpenLoginModal((prev) => !prev)}
          >
            X
          </button>

          <p className="singin_msg">Diwali Card</p>
          <form onSubmit={handleSaveUser} className="signIn_Form">
            <input
              name="name"
              type="text"
              placeholder="Name"
              value={user.name}
              onChange={handleChange}
            />
            <input
              name="phoneNo"
              type="number"
              placeholder="Phone no."
              value={user.phoneNo}
              onChange={handleChange}
            />
            <div className="button_container">
              <button type="submit">Submit</button>
            </div>
          </form>
          <div className="logo_handler"></div>
        </div>
      ) : (
        <button
          onClick={() => setOpenLoginModal((prev) => !prev)}
          className="signIn_btn"
        >
          Diwali Card
        </button>
      )}
    </div>
  );
}
