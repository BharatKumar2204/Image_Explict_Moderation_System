import React from 'react'
import Loader from './Loader';
import './../../App.css'
function DragDropFile() {
    // drag state
    const [dragActive, setDragActive] = React.useState(false);
    const [process, setProcess] = React.useState(false);
    const [data, setData] = React.useState(false);
    const [name, setName] = React.useState('');
    const [confidence, setConfidence] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [file_img, setFile] = React.useState('');
    const [moderate, setModerate] = React.useState(false);

    // ref
    const inputRef = React.useRef(null);
    
    // handle drag events
    const handleDrag = function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };
    
    // triggers when file is dropped
    const handleDrop = function(e) {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFiles(e.dataTransfer.files);
      }
    };
    
    // triggers when file is selected with click
    const handleChange = function(e) {
      e.preventDefault();
      if (e.target.files && e.target.files[0]) {
        handleFiles(e.target.files);
      }
    };
    
  // triggers the input when the button is clicked
    const onButtonClick = () => {
      inputRef.current.click();
    };

    const handleFiles = (file) => {
        setProcess(true)
        const files = Array.from(file);
        const formData = new FormData();
        formData.append("file", files[0]); // key - value
        if (file_img !== null) {
          URL.revokeObjectURL(file);
      }

        //const data = response.json();
           
            fetch("https://image-explict-moderation.onrender.com/image", {
                method: 'POST',
                body: formData,
                contentType: false,
                processData: false
            })
              .then((response) => response.json())
              .then((json) => {
                console.log(json);
                setProcess(false)
                setFile(`data:image/jpeg;base64, ${json['data']}`);
                if(json['more_fields']['ModerationLabels'].length>0){
                  setModerate(true)
                  setData(true)
                  setName(json['more_fields']['ModerationLabels'][0]['Name'])
                  setConfidence(json['more_fields']['ModerationLabels'][0]['Confidence'].toFixed(2))
                  setCategory(json['more_fields']['ModerationLabels'][0]['ParentName'])
                }
                else{
                  setModerate(false)
                  setData(' ')
                }
               
              });
      };
    
    return (
      <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()} style={{padding:'30px'}}>
        <input ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
        <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : "" }>
          {process?<Loader/>:
          <div>
            {file_img?
            <div>
              {moderate?<img src={file_img} className='mask1' alt="jeye"/>:<img src={file_img}  alt="jeye"/>}
            </div>
            :
            <div>
            <p>Drag and drop your file here or</p>
            <button className="upload-button" onClick={onButtonClick}>Upload a file</button>
            </div>
            }
            </div>
          } 
        </label>
        {moderate&&data&&
        <p style={{paddingTop:'20px'}}>Image Categorised as {category}: {name} and Confidence percentage is {confidence}%</p>
        }
        {!moderate&&data&&<p style={{paddingTop:'20px'}}>Image Doesn't Contain Any Explicit Content</p>}
        { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
      </form>
    );
  };

  export default DragDropFile  