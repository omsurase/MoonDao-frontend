import { Player, useAssetMetrics, useCreateAsset } from '@livepeer/react';

import { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useEffect } from 'react';
import fetchAssets from '@/api/livepeervideo.api';
import HeroSection from '../org2/HeroSection';


export default function UploadVideoAsset() {
  const [video, setVideo] = useState();
  const [playbackId, setPlaybackId] = useState();
  const [hidden, setHidden] = useState(true);
  const {
    mutate: createAsset,
    data: asset,
    status,
    progress,
    error,
  } = useCreateAsset(
    video
      ? {
        sources: [{ name: video.name, file: video }],
      }
      : null,
  );
  const { data: metrics } = useAssetMetrics({
    assetId: asset?.[0].id,
    refetchInterval: 30000,
  });

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0 && acceptedFiles?.[0]) {
      setVideo(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'video/*': ['*.mp4'],
    },
    maxFiles: 1,
    onDrop,
  });

  const isLoading = useMemo(
    () =>
      status === 'loading' ||
      (asset?.[0] && asset[0].status?.phase !== 'ready'),
    [status, asset],
  );

  const progressFormatted = useMemo(
    () =>
      progress?.[0].phase === 'failed'
        ? 'Failed to process video.'
        : progress?.[0].phase === 'waiting'
          ? 'Waiting...'
          : progress?.[0].phase === 'uploading'
            ? `Uploading: ${Math.round(progress?.[0]?.progress * 100)}%`
            : progress?.[0].phase === 'processing'
              ? `Processing: ${Math.round(progress?.[0].progress * 100)}%`
              : null,
    [progress],
  );
  const [assets, setAssets] = useState([]);



  useEffect(() => {

    const fetchVideo = async () => {
      const x = await fetchAssets();
      setAssets(x);
    }

    fetchVideo();
    // console.log(assets);


  }, [assets]);

  const playAsset = (playbackId) => {
    setPlaybackId(playbackId);
  }


  return (
    <div className='bg-[#EAFDFC]'>
      <HeroSection orgName="📹 MoonDao Video Assets" />


      <div className=" grid grid-cols-2 text-black gap-4 bg-[#EAFDFC]">
        <div className='border-4 border-indigo-500 rounded-lg'>
          <h1 className='text-bold  text-2xl text-center underline p-4'>Uploaded Assets:</h1>
          {assets && assets.map((asset) => (
            <div key={asset.id} className='p-2 m-2 border-2 border-indigo-500 rounded-lg ' onClick={() => {

              playAsset(asset.playbackId);
              setHidden(!hidden);
            }}>
              <h1>{asset.name}</h1>
              {/* <p>{asset.id}</p> */}
              {/* <p>{asset.createdAt}</p> */}
              {/* <p>{asset.playbackId}</p> */}


            </div>
          ))
          }
        </div>

        <div className="hero-content text-center grid grid-rows-4 grid-flow-col gap-4 ">
          <div className={hidden ? "hidden" : "border-2 mt-2"}>

            <Player playbackId={playbackId} />
          </div>



          {!asset && (
            <div>
              <div className='flex flex-row p-4 m-4'>
                <h1 className='p-4 underline'>Assets Uploaded Using: </h1>
                <img src="../images/Livepeer.png" className='object-center' alt="livepeer" width="50" height="50" />
              </div>

              <div className='flex-initial w-64  m-4 border-solid border-2 border-indigo-500/50 p-10' {...getRootProps()}>

                <input {...getInputProps()} />
                <p>Drag and drop or browse files</p>


                {error?.message && <p>{error.message}</p>}
              </div>
            </div>
          )}



          {asset?.[0]?.playbackId && (
            <Player title={asset[0].name} playbackId={asset[0].playbackId} />
          )}

          <div>
            {metrics?.metrics?.[0] && (
              <p>Views: {metrics?.metrics?.[0]?.startViews}</p>
            )}

            {video ? <p>{video.name}</p> : <p></p>}

            {progressFormatted && <p>{progressFormatted}</p>}

            {!asset?.[0].id && (
              <button
                onClick={() => {
                  createAsset?.();
                }}
                disabled={isLoading || !createAsset}
                className=' border-2 border-sky-500 btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg m-3 '
              >
                Upload
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className='grid grid-cols-2 gap-4'> 
  //   <div>hi</div>
  //   <div>hi</div></div>
  // );
}