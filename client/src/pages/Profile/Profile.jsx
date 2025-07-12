import { useContext, useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { Context } from "../..";
import { useProfileData } from "./useProfileData";
import NotifyModal from "../../components/common/NotifyModal/NotifyModal";
import { logout } from "../../http/userAPI";
import ProfileForm from "./ProfileForm";

const Profile = () => {
  const { user } = useContext(Context);

  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const {
    formData,
    setFormData,
    isEditable,
    setIsEditable,
    load,
    save,
    cancel,
  } = useProfileData(user.user.id);

  useEffect(() => {
    load();
  }, [user]);

  const handleSave = async () => {
    try {
      const msg = await save();
      setMessage(msg);
      setShowModal(true);
    } catch (err) {
      console.error(err);
    }
  };
  const handleCancel = async () => {
    try {
      cancel();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      user.reset();
    } catch (error) {
      setMessage("Error logging out. Please try again.");
      setShowModal(true);
    }
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <NotifyModal
          title="Profile change"
          message={message}
          active={showModal}
          setActive={setShowModal}
        />
        <h1 className={styles.title}>
          Hello, <span className="light-green">{formData.username}</span>
        </h1>
        <ProfileForm
          formData={formData}
          setFormData={setFormData}
          isEditable={isEditable}
        />
        <div className={styles.controls}>
          <div className={styles.group}>
            {isEditable ? (
              <button onClick={handleCancel} className={styles.cancel}>
                Cancel
              </button>
            ) : (
              <button
                onClick={() => setIsEditable(true)}
                className={styles.edit}
              >
                Edit
              </button>
            )}
            <div className={styles.buttons}>
              {isEditable && (
                <button onClick={handleSave} className={styles.save}>
                  Save
                </button>
              )}
            </div>
          </div>
          <button onClick={handleLogout} className={styles.logout}>
            Log Out
          </button>
        </div>
      </div>
    </main>
  );
};

export default Profile;
