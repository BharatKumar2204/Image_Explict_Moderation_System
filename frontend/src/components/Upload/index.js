import React from 'react';
import {Button} from 'react-bootstrap';
import Loader from './Loader';
import DragDropFile from './DragDropFile';

class Upload extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            uploading: false,
            
        };
        this.handleChange = this.handleChange.bind(this);
        this.message=null
        this.load=false
        this.data=false
    }
    
    async handleChange(event) {
        this.load=true
        if (this.state.file !== null) {
            URL.revokeObjectURL(this.state.file);
        }
        
        // Uncomment this if you wish to preview the image right after selection
        this.setState({
            file: URL.createObjectURL(event.target.files[0]),
            uploading: true
        });

        // Create a FormData to POST to backend
        const files = Array.from(event.target.files);
        const formData = new FormData();
        formData.append("file", files[0]); // key - value
        
        // Send to Flask
        const response = await fetch(`https://image-explict-moderation.onrender.com/image`, {
            method: 'POST',
            body: formData,
            contentType: false,
            processData: false
        })

        const data = await response.json();
        
        if (data){
            this.load=false
            this.data=true
        }
        this.message=data['more_fields']['ModerationLabels'][0]['Name']
        this.setState({
            file: `data:image/jpeg;base64, ${data['data']}`,
            uploading: true
        });

    }

    render() {
        return (
            <div>

              
      <DragDropFile/>
                {this.load?<Loader/>:

                <div className="container" style={{ width: "100%"}}>
                {this.data && this.state.file && <img src={this.state.file}  alt="jeye"  className='mask1' /> }
  <div className="center">{this.data&&<Button className='p-2'>View Content</Button>}<br/>{this.message}</div>
</div>
}
            </div>
        );
    }
}

export default Upload;
