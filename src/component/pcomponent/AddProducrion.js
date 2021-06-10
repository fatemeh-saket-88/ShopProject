import React, { useEffect, useState }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {
  Textbox,
  Select
} from "react-inputs-validation";
import "react-inputs-validation/lib/react-inputs-validation.min.css";
import "./AddProduct.css";
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';


import {connect} from 'react-redux'
import {addItem,editItem} from '../../redux/action'


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  input: {
  },
    button: {
    margin: "30px",
  },
});
 function AddProducrion(props) {
  //  console.log(props.data)
  const  STATUSE_OPTIONS_LIST = [
    { name: "در دسترس", id: "0" },
    { name: "به زودی", id: "1" },
    { name: "توقف تولید", id: "2" },
  ];
   let id=props.match.params.id? parseInt(props.match.params.id)-1: -1
   
   let statueData=id>=0?STATUSE_OPTIONS_LIST.filter(e=>e.name===props.data.items[id].stock)[0].id:''

  const[state,setState]=useState(
    {
      name:id>=0?props.data.items[id].title:" " ,
      // images:id>=0?props.data.items[id].images:"" , 
      images:"" , 
      tare:id>=0?props.data.items[id].tare:" " , 
      totalWeight:id>=0?props.data.items[id].totalWeight:" "  ,
      cost:id>=0?props.data.items[id].Price:" " ,
      rebate:id>=0?props.data.items[id].rebate:" " ,
     discription:id>=0?props.data.items[id].discription:" "  
    }
    )
    // useEffect(()=>{
    //   if(id>=0){
    //     setState({...state,[state.images]:props.data.items[id].images})
    //    }
    // },[])
  const[statuse,setStatuse]=useState(statueData)
  const [hasNameError,setHasNameError]=useState(true)
  const [hasImagesError,setHasImagesError]=useState(true)
  const [hasTareError,setHasTareError]=useState(true)
  const [hasTotalWeightError,setHasTotalWeightError]=useState(true)
  const [hasCostError,setHasCostError]=useState(true)
  const [hasRebateError,setHasRebateError]=useState(true)
  const [hasDiscriptionError,setHasDiscriptionError]=useState(true)
  const [hasStatuseError,setHasStatuseError]=useState(true)


  const [checked, setChecked] = React.useState(false)

  const [validate,setValidate]=useState(false)
  const classes = useStyles();

 
const goBack=()=>{
  props.history.goBack()  
}
  const validateForm=(e)=>{
          e.preventDefault();
          toggleValidating(true);
          if (
            !hasNameError &&
            !hasTareError &&
            !hasTotalWeightError &&
            // !hasImagesError &&
            !hasCostError &&
            !hasDiscriptionError &&
            !hasStatuseError
            ) {


              let statuseName=STATUSE_OPTIONS_LIST[parseInt(statuse)].name
              if(id>=0){
                props.editItem(state,statuseName, parseInt(props.match.params.id))
              }
              else if(id=-1)
               { 
                 props.addItems(state,statuseName)
                }
            goBack()

          }
        }
  const toggleValidating=(validate)=>{
      setValidate ( validate );
        }
  
        const handleChange = (event) => {
          setChecked(event.target.checked);
        };
    //************** */ style**************//////////
        const rowStyle = {
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "2%",
          fontSize: "14px"
        };
        const rowWrapperStyle = {
          display: "table",
          width: "70%"
        };
        const rowContainerStyle = {
          display: "block",
          verticalAlign: "middle",
          // borderBottom: "1px solid #e5e5e5"
        };
        const labelStyle = {
          display: "inline-block"
        };
        const labelContentStyle = {
          verticalAlign: "middle"
        };
  return (
    <Card className={classes.root}  >
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        مشخصات
        </Typography>
<form onSubmit={validateForm}>
          <div style={rowWrapperStyle}>
            {/* //name=عنوان محصول */}
            <div style={rowContainerStyle}>
              <div style={rowStyle}>
                <div
                  style={{ ...labelStyle, flex: "1 3 0px", marginTop: "3px" }}
                >
                  <span style={{labelContentStyle , fontSize: "15px"}}>عنوان محصول</span>
                </div>
                <div style={{ flex: "6 6 0px" }}>
                  <Textbox
                    attributesInput={{
                      id: "Name",
                      name: "name",
                      type: "text",
                      placeholder: "عنوان محصول"
                    }}
                    value={state.name}
                    disabled={false} 
                    validate={validate} 
                    validationCallback={res =>
                      {
                        setHasDiscriptionError(res);
                        setValidate(false)
                      }
                    } 
                    onChange={(name,e) => {
                      setState({...state,[e.target.name]:e.target.value})
                    }}
                    validationOption={{
                      name: "name", 
                      check: true, 
                      required: true,
                      msgOnError:"لصفا اطلاعات عنوان محصول را کامل کنید"
                    }}
                  />
                </div>
              </div>
           
            </div>
            
            {/* //images=عکس محصول */}
            <div style={rowContainerStyle}>
              <div style={rowStyle}>
                <div
                  style={{ ...labelStyle, flex: "1 3 0px", marginTop: "3px" }}
                >
                  <span style={{labelContentStyle , fontSize: "15px"}}>عکس محصول</span>
                </div>
                <div style={{ flex: "6 6 0px" }}>
                  <Textbox
                    attributesWrapper={{}}
                    attributesInput={{
                      id: "images",
                      name: "images",
                      type: "file",
                      placeholder: "عکس",
                      accept:"image/*",
                    }}
                    value={state.images}
                    disabled={false} 
                    validate={validate} 
                    validationCallback={res =>
                      {
                        setHasImagesError(res);
                        setValidate(false)
                      }
                    } 
                    classNameInput="" 
                    classNameWrapper="" 
                    classNameContainer="" 
                    customStyleInput={{}} 
                    customStyleWrapper={{}} 
                    customStyleContainer={{}} 
                    onChange={(name,e) => {
                      console.log("upload files ",e.target.files[0])
                      console.log("upload url ",e.target.value)

                      setState({...state,[e.target.name]:e.target.value})
                    }}
                    validationOption={{
                      name: "images", 
                      check: true, 
                      required: false,
                      msgOnError:"لطفا اطلاعات عکس محصول را کامل کنید"
                    }}
                  />
                </div>
              </div>
           
            </div>
            
            {/* //tare=وزن خالص */}
            <div style={rowContainerStyle}>
              <div style={rowStyle}>
                <div
                  style={{ ...labelStyle, flex: "1 3 0px", marginTop: "3px" }}
                >

                  <span style={{labelContentStyle , fontSize: "15px"}}>وزن خالص</span>
                </div>
                <div style={{ flex: "6 6 0px" }}>
                  <Textbox
                    attributesWrapper={{}}
                    attributesInput={{
                      id: "tare",
                      name: "tare",
                      type: "text",
                      placeholder: "وزن خالص"
                    }}
                    value={state.tare}
                    disabled={false} 
                    validate={validate} 
                    validationCallback={res =>
                      {
                        setHasTareError(res);
                        setValidate(false)
                      }
                    } 
                    classNameInput="" 
                    classNameWrapper="" 
                    classNameContainer="" 
                    customStyleInput={{}} 
                    customStyleWrapper={{}} 
                    customStyleContainer={{}} 
                    onChange={(name,e) => {
                      setState({...state,[e.target.name]:e.target.value})
                    }}
                    validationOption={{
                      name: "weight", 
                      check: true, 
                      required: true ,
                      msgOnError:"لطفا اطلاعات وزن خالص را کامل کنید",
                      customFunc: tare => {
                        if (tare>=0) {
                          return true;
                        } else {
                          return "لطفا شماره ی معتبر را وارد نمایید";
                        }
                      }
                    }}
                  />
                </div>
              </div>
           
            </div>
            
            {/* //totalWeight=وزن+بسته بندی */}
            <div style={rowContainerStyle}>
              <div style={rowStyle}>
                <div
                  style={{ ...labelStyle, flex: "1 3 0px", marginTop: "3px" }}
                >
                  {/* <span
                    className="icon icon-person"
                    style={{ ...labelContentStyle, fontSize: "20px" }}
                  />
                  &nbsp; */}
                  <span style={{labelContentStyle , fontSize: "15px"}}>وزن و بسته بندی</span>
                </div>
                <div style={{ flex: "6 6 0px" }}>
                  <Textbox
                    attributesWrapper={{}}
                    attributesInput={{
                      id: "totalWeight",
                      name: "totalWeight",
                      type: "text",
                      placeholder: "وزن کل و بسته بندی"
                    }}
                    value={state.totalWeight}
                    disabled={false} 
                    validate={validate} 
                    validationCallback={res =>
                      {
                        setHasTotalWeightError(res);
                        setValidate(false)
                      }
                    } 
                    classNameInput="" 
                    classNameWrapper="" 
                    classNameContainer="" 
                    customStyleInput={{}} 
                    customStyleWrapper={{}} 
                    customStyleContainer={{}} 
                    onChange={(name,e) => {
                      setState({...state,[e.target.name]:e.target.value})
                    }}
                    validationOption={{
                      name: "weight", 
                      check: true, 
                      required: true ,
                      msgOnError:"لطفا اطلاعات وزن کل و بسته بندی را کامل کنید",
                      customFunc: tare => {
                        if (tare>=0) {
                          return true;
                        } else {
                          return "لطفا شماره ی معتبر را وارد نمایید";
                        }
                      }
                    }}
                  />
                </div>
              </div>
           
            </div>
           
            {/* // cost= قیمت */}
            <div style={rowContainerStyle}>
              <div style={rowStyle}>
                <div
                  style={{ ...labelStyle, flex: "1 3 0px", marginTop: "3px" }}
                >
                  <span style={{labelContentStyle , fontSize: "15px"}}>قیمت</span>
                </div>
                <div style={{ flex: "6 6 0px" }}>
                  <Textbox
                    attributesWrapper={{}}
                    attributesInput={{
                      id: "cost",
                      name: "cost",
                      type: "text",
                      placeholder: "قیمت"
                    }}
                    value={state.cost}
                    disabled={false} 
                    validate={validate} 
                    validationCallback={res =>
                      {
                        setHasCostError(res);
                        setValidate(false)
                      }
                    } 
                    classNameInput="" 
                    classNameWrapper="" 
                    classNameContainer="" 
                    customStyleInput={{}} 
                    customStyleWrapper={{}} 
                    customStyleContainer={{}} 
                    onChange={(name,e) => {
                      setState({...state,[e.target.name]:e.target.value})
                    }}
                    validationOption={{
                      name: "cost", 
                      check: true, 
                      required: true ,
                      msgOnError:"لطفا اطلاعات قیمت محصول را کامل کنید",
                      customFunc: tare => {
                        if (tare>=0) {
                          return true;
                        } else {
                          return "لطفا مقدار معتبر را وارد نمایید";
                        }
                      }
                    }}
                  />
                </div>
              </div>
           
            </div>
            
            {/* //rebate=تخفیف */}
            <div style={rowContainerStyle}>
              <div style={rowStyle}>
                <div
                  style={{ ...labelStyle, flex: "1 3 0px", marginTop: "3px" }}
                >
                  <span style={{labelContentStyle , fontSize: "15px"}}>قیمت با تخفیف</span>
                </div>
                <div style={{ flex: "6 6 0px" }}>
                  <Textbox
                    attributesWrapper={{}}
                    attributesInput={{
                      id: "rebate",
                      name: "rebate",
                      type: "text",
                      placeholder: "قیمت با تخفیف"
                    }}
                    value={state.rebate?state.rebate:''}
                    disabled={!checked} 
                    validate={checked} 
                    validationCallback={res =>
                      {
                        setHasRebateError(res);
                        setValidate(false)
                      }
                    } 
                    classNameInput="" 
                    classNameWrapper="" 
                    classNameContainer="" 
                    customStyleInput={{}} 
                    customStyleWrapper={{}} 
                    customStyleContainer={{}} 
                    onChange={(name,e) => {
                      setState({...state,[e.target.name]:e.target.value})
                    }}
                    validationOption={{
                      name: "rebate", 
                      check: true, 
                      required: true ,
                      msgOnError:"لطفا اطلاعات قیمت محصول را کامل کنید",
                      
                      customFunc: tare => {
                        if (tare>=0) {
                          return true;
                        } else {
                          return "لطفا مقدار معتبر را وارد نمایید";
                        }
                      }
                    }}
                  />
      
                </div>
                <span   >
              <Checkbox  checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'primary checkbox' }}/>
              تخفیف
              </span>
              </div>
           
            </div>
          
          {/* //statuse=وضعیت */}
          <div style={rowContainerStyle}>
              <div style={rowStyle}>
                <div
                  style={{ ...labelStyle, flex: "1 2 0px", marginTop: "3px" }}
                >
                  <span style={labelContentStyle}>وضعیت</span>
                </div>
                <div style={{ flex: "6 6 0px" }}>
                  <Select
                    attributesWrapper={{}}
                    attributesInput={{
                      id: "statuse",
                      name: "statuse",
                    }}
                    value={statuse} 
                    disabled={false} 
                    showSearch={false}
                    validate={validate} 
                    validationCallback={res =>
                      {
                        setHasStatuseError(res);
                        setValidate(false)
                      }
                    } 
                    optionList={STATUSE_OPTIONS_LIST} 
                    classNameSelect="" 
                    classNameWrapper="" 
                    classNameContainer="" 
                    classNameOptionListContainer="" 
                    classNameOptionListItem="" 
                    customStyleSelect={{}}
                    customStyleWrapper={{}} 
                    customStyleContainer={{}}
                    customStyleOptionListContainer={{
                      maxHeight: "200px",
                      overflow: "auto",
                      fontSize: "14px"
                    }}
                    customStyleOptionListItem={{}} 
                    onChange={(res,e) => {
                      setStatuse(res.id)
                    }}
                   validationOption={{
                      name: "statuse", 
                      check: true,
                      required: true,
                      msgOnError:"لطفا لیست را کامل کنید",
                    }}
                  />
                </div>
              </div>
            </div>
        
           {/* //discription=توضیحات */}
           <div style={rowContainerStyle}>
              <div style={rowStyle}>
                <div
                  style={{ ...labelStyle, flex: "1 1 0px", marginTop: "3px" }}
                >
                  <span style={{labelContentStyle , fontSize: "15px"}}>توضیحات</span>
                </div>
                <div style={{ flex: "6 6 0px" }}>
                  <Textbox
                    attributesWrapper={{}}
                    attributesInput={{
                      id: "discription",
                      name: "discription",
                      type: "text",
                      placeholder: "توضیحات",
                      // maxLength: '10',
                      // cols: '10',
                      // rows: '10',
                    }}
                    value={state.discription}
                    disabled={false} 
                    validate={validate} 
                    validationCallback={res =>
                      {
                        setHasNameError(res);
                        setValidate(false)
                      }
                    } 
                    classNameInput="" 
                    classNameWrapper="" 
                    classNameContainer="" 
                    customStyleInput={{}} 
                    customStyleWrapper={{}} 
                    customStyleContainer={{}} 
                    onChange={(name,e) => {
                      setState({...state,[e.target.name]:e.target.value})
                    }}
                    validationOption={{
                      name: "name", 
                      check: true, 
                      required: true,
                      msgOnError:"لصفا اطلاعات عنوان محصول را کامل کنید"
                    }}
                  />
                </div>
              </div>
           
            </div>
          
          </div>


          <Button variant="contained" color="primary" onClick={validateForm} className={classes.button}>
                 ثبت
            </Button>
           <Button variant="contained" color="primary" onClick={validateForm} onClick={()=>goBack()} 
           className={classes.button}>
              بازگشت
           </Button>
        </form>
      
      </CardContent>
    </Card>
  );
}
const mapStateToProps=(state)=>({
  data:state
})
const mapStateToDispatch=(dispatch)=>({
  addItems :(state,statuse)=>dispatch(addItem(state,statuse)),
  editItem:(state,statuse,id)=>dispatch(editItem(state,statuse,id))
})
export default connect(mapStateToProps,mapStateToDispatch)(AddProducrion)

