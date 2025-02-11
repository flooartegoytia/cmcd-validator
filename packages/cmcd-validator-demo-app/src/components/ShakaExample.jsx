import React, { useEffect, useRef, useState } from "react";
import ShakaPlayer from "shaka-player-react";
import muxjs from "mux.js";
import "shaka-player/dist/controls.css";
import "./ShakaExample.css";
import { DataWindow } from "./DataWindow";
import { ValidatorView } from "./ValidatorView";
import { CMCDQueryValidator } from "@montevideo-tech/cmcd-validator";
import VideoJS from "./VideojsExample";

export function ShakaExample() {
  window.muxjs = muxjs;
  const controllerRef = useRef(null);
  const [newData, setNewData] = useState([{}]);
  const [validatorOutput, setValidatorOutput] = useState("");
  const [url, setUrl] = useState(
    "https://demo.unified-streaming.com/k8s/live/stable/scte35-no-splicing.isml/.mpd"
  );
  const handleInput = (input) => {
    setUrl(input.target.value);
  };

  const onButtonClick = () => {
    // const {
    //   /** @type {shaka.Player} */ player,
    //   /** @type {shaka.ui.Overlay} */ ui,
    //   /** @type {HTMLVideoElement} */ videoElement,
    // } = controllerRef.current;

    // player.configure({
    //   cmcd: {
    //     contentId: "testContentId",
    //     enabled: true,
    //     sessionId: "testSessionId",
    //     useHeaders: false,
    //   },
    // });
    // const networkEngine = player.getNetworkingEngine();
    // networkEngine.registerRequestFilter((type, request) => {
    //   const newUris = [{}];
    //   const urisToAdd = [...new Set(request.uris)];
    //   for (const uri of urisToAdd) {
    //     newUris.push({ url: uri, result: CMCDQueryValidator(uri) });
    //   }
    //   setNewData(newUris);
    // });
    // async function loadAsset() {
    //   // Load an asset.
    //   try {
    //     await player.load(url);
    //   } catch (error) {
    //     console.log(error);
    //   }
    //   // Trigger play.
    //   videoElement.play();
    // }
    // loadAsset();
  };

  const videojsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      type: 'application/x-mpegURL'
    }]
  }

  const playerRef = React.useRef(null);

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    const vhs = player.tech(true).vhs;
    console.log(vhs)

    vhs.xhr.beforeRequest = function(options) {
      console.log('entr1')
      console.log(options)

      return options;
    }   

    player.on("waiting", () => {
      console.log("player is waiting");
    });
  };

  

  return (
    <>
      {/* <div className="mb-4 contet input-group d-flex justify-content-center">
        <input
          className="text ms-2"
          placeholder="Manifest URL"
          onChange={handleInput}
        ></input>
        <button className="btn btn-primary" onClick={onButtonClick}>
          Start Shaka
        </button>
      </div> */}
      <div className="row">
        <div className="col-6">
          <div className="col-12 mb-4">
            {/* <ShakaPlayer ref={controllerRef} /> */}
            <VideoJS options={videojsOptions} onReady={handlePlayerReady}/>
          </div>
          <ValidatorView output={validatorOutput} />
        </div>
        <div className="col-6">
          <DataWindow
            newData={newData}
            setValidatorOutput={setValidatorOutput}
          />
        </div>
      </div>
    </>
  );
}
