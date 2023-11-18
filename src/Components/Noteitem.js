import React,{useContext} from "react";
import noteContext from '../Context/notes/noteContext'


const Noteitem = (props) => {
    const context=useContext(noteContext)
  const { deletenote } =context
  const {note,updatenote}=props
  return (
    <div className="row my-3">
      <div className="card my-3" >
        <div className="card-body">
            <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i className="far fa-trash-alt mx-2" onClick={()=>{
                deletenote(note._id);
                props.showalert("Deleted Successfully","success")
            }}></i>
            <i className="far fa-edit mx-2" onClick={()=>{
              updatenote(note)
            }}
            ></i>
            </div>
          <p className="card-text">
            {note.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
