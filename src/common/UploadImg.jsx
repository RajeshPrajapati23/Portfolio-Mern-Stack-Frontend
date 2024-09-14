import React, { useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { Cropper } from "react-cropper";
import { toastCustm } from "./method";
import Loader from "../pages/Loader";

const UploadImg = (props) => {
  const [state, setState] = useState({
    modalShow: false,
    cropReslt: "",
    loader: false,
  });
  const cropperRef = useRef(null);

  // METHODS
  const onCloseModal = () => {
    setState({ ...state, modalShow: false });
  };
  const inputFileHandler = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (file && file.size > 1024 * 1024 * 2) {
      toastCustm(false, "", "You can Upload image up to 2 mb");
      return;
    } else {
      if (file && !file.type.startsWith("image/")) {
        toastCustm(false, "", "Please select a valid image file.");
        return;
      }
    }
    setState({ ...state, [name]: URL.createObjectURL(file), modalShow: true });
  };
  const onCrop = async () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      setState((prev) => ({ ...prev, loader: true }));

      let base64 = await cropper
        .getCroppedCanvas()
        .toDataURL("image/jpeg", 0.6);
      setState({
        ...state,
        cropReslt: base64,
        modalShow: false,
        loader: false,
      });
      props.getbase64(base64);
    }
  };

  const { modalShow, file, cropReslt, loader } = state;
  return (
    <div className="z-50">
      {loader && <Loader />}
      <input type="file" name="file" onChange={inputFileHandler} />
      {cropReslt && (
        <img
          src={cropReslt}
          alt="img"
          style={{
            maxHeight: "100px",
            width: "100%",
            borderRadius: "9px",
            objectFit: "contain",
            boxSizing: "border-box",
          }}
        />
      )}
      <Modal
        show={modalShow}
        onHide={onCloseModal}
        className="bg-[#77747B] z-99 modal"
      >
        <Modal.Header closeButton className="bg-[blue1]"></Modal.Header>
        <Modal.Body className="bg-[blue1]">
          <Cropper
            src={file}
            ref={cropperRef}
            style={{
              maxHeight: "300px",
              width: "100%",
              backgroundColor: "#fff",
              objectFit: "contain",
              boxSizing: "border-box",
            }}
            background={false}
            capture="environment"
            guides={false}
            viewMode={1}
            checkOrientation={false}
            zoomable={false}
          />
          <button
            className="bg-[red] py-[8px] px-[9px] text-white text-center rounded-lg align-center w-[100%] mt-[8px]"
            onClick={onCrop}
          >
            Submit
          </button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UploadImg;
