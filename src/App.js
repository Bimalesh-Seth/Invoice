import React, { Component } from "react";
// import "./assets/bootstrap.min.css";
import "./App.css";
import moment from "moment";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      name: "",
      address: "",
      mobile: "",
      receiptNo: this.generateReceiptNo(8),
      date: moment().format("DD/MM/YYYY"),
      mobileName: "",
      description: "",
      nos1: "",
      nos2: "",
      battaryNo: "",
      chargerNo: "",
      qty: "",
      price: "",
      type: true,
    };
  }

  // componentDidMount() {
  //   let tag = document.createElement("script");
  //   tag.async = false;
  //   tag.src = "/bootstrap.bundle.min.js";
  //   document.getElementsByTagName("body")[0].appendChild(tag);
  // }

  print = () => {
    var divContents = document.getElementById("PrintArea").innerHTML;
    var a = window.open("", "", "height=500, width=500");
    a.document.write("<html>");
    a.document.write("<body>");
    a.document.write(divContents);
    a.document.write("</body></html>");
    a.document.close();
    a.print();
  };

  update = (name, e) => {
    this.setState({ [name]: e.target.value });
  };

  capitalize = (words) => {
    var separateWord = words.toLowerCase().split(" ");
    for (var i = 0; i < separateWord.length; i++) {
      separateWord[i] =
        separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
    }
    return separateWord.join(" ");
  };

  addMobile = () => {
    console.log(this.state.items);
    let items = [...this.state.items];
    if (this.state.type) {
      items.push({
        type: "mobile",
        id: Math.floor(Math.random() * 1000),
        mobileName: this.state.mobileName,
        description: this.state.description,
        nos1: this.state.nos1,
        nos2: this.state.nos2,
        battaryNo: this.state.battaryNo,
        chargerNo: this.state.chargerNo,
        qty: this.state.qty,
        price: this.state.price,
      });
    } else {
      items.push({
        type: "other",
        id: Math.floor(Math.random() * 1000),
        mobileName: this.state.mobileName,
        qty: this.state.qty,
        price: this.state.price,
      });
    }

    this.setState({
      items,
      mobileName: "",
      description: "",
      nos1: "",
      nos2: "",
      battaryNo: "",
      chargerNo: "",
      qty: "",
      price: "",
    });
  };

  deleteRow = (id) => {
    let tempArr = [...this.state.items];
    let items = tempArr.filter((item) => item.id !== id);
    this.setState({ items });
  };

  generateReceiptNo = (length) => {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  render() {
    const style = {
      th: {
        textAlign: "center",
        fontSize: "18px",
        fontWeight: "bold",
        border: "2px solid black",
      },

      td: {
        textAlign: "center",
        fontSize: "14px",
        fontWeight: "bold",
        border: "2px solid black",
      },

      table: {
        marginTop: "10px",
        width: "100%",
        borderCollapse: "collapse",
        border: "2px solid black",
      },
      infoFieldLabel: {
        margin: "0px",
        pMobileing: "5px 0px 0px 10px",
        fontSize: "16px",
        fontWeight: "bold",
      },
      infoField: {
        margin: "0px",
        padding: "0px 0px 0px",
        fontSize: "14px",
      },
      column: {
        one: {
          width: "52%",
        },
        two: {
          width: "8%",
        },
        three: {
          width: "15%",
        },
        four: {
          width: "15%",
        },
        five: {
          width: "5%",
        },
        six: {
          width: "5%",
        },
      },
    };

    let grandTotal = 0;
    const rows = this.state.items.map((item, index) => {
      grandTotal += item.qty * item.price;
      let others = null;
      if (item.type === "mobile") {
        others = (
          <td style={{ ...style.td }}>
            <div>
              <div style={{ fontSize: "16px" }}>
                {this.capitalize(item.mobileName)}
              </div>
              <div>( {this.capitalize(item.description)} )</div>
              <div style={{ width: "100%" }}>
                <span style={{ fontSize: "12px" }}>
                  {" "}
                  IMEI No. (Warranty - 12 Months):{" "}
                </span>
                <br />
                1. &nbsp; {item.nos1}
                <br />
                2. &nbsp; {item.nos2}
              </div>
              <div>
                <span style={{ fontSize: "12px" }}>
                  {" "}
                  Battary No. (Guarantee - 6 Months) :
                </span>{" "}
                {item.battaryNo.toUpperCase()}
              </div>
              <div>
                <span style={{ fontSize: "12px" }}>
                  Charger No. (Guarantee - 6 Months) :
                </span>{" "}
                {item.chargerNo.toUpperCase()}
              </div>
            </div>
          </td>
        );
      } else {
        others = (
          <td style={{ ...style.td }}>
            <div>
              <div style={{ fontSize: "16px" }}>
                {this.capitalize(item.mobileName)}
              </div>
            </div>
          </td>
        );
      }
      return (
        <tr key={index}>
          <td style={{ ...style.td }}>{index + 1}</td>
          {others}
          <td style={{ ...style.td }} className='td'>
            {item.qty}
          </td>
          <td style={{ ...style.td }} className='td'>
            {item.price}
          </td>
          <td style={{ ...style.td }} className='td'>
            {item.qty * item.price}
          </td>
        </tr>
      );
    });

    const rowsData = this.state.items.map((item, index) => {
      let others = null;
      if (item.type === "mobile") {
        others = (
          <td style={{ ...style.td }}>
            <div>
              <div style={{ fontSize: "16px" }}>
                {this.capitalize(item.mobileName)}
              </div>
              <div>( {this.capitalize(item.description)} )</div>
              <div style={{ width: "100%" }}>
                <span style={{ fontSize: "12px" }}>
                  {" "}
                  IMEI No. (Warranty - 12 Months):{" "}
                </span>
                <br />
                1. &nbsp; {item.nos1}
                <br />
                2. &nbsp; {item.nos2}
              </div>
              <div>
                <span style={{ fontSize: "12px" }}>
                  {" "}
                  Battary No. (Guarantee - 6 Months) :
                </span>{" "}
                {item.battaryNo.toUpperCase()}
              </div>
              <div>
                <span style={{ fontSize: "12px" }}>
                  Charger No. (Guarantee - 6 Months) :
                </span>{" "}
                {item.chargerNo.toUpperCase()}
              </div>
            </div>
          </td>
        );
      } else {
        others = (
          <td style={{ ...style.td }}>
            <div>
              <div style={{ fontSize: "16px" }}>
                {this.capitalize(item.mobileName)}
              </div>
            </div>
          </td>
        );
      }
      return (
        <tr key={index}>
          <td style={{ ...style.td }}>{index + 1}</td>
          {others}
          <td style={{ ...style.td }} className='td'>
            {item.qty}
          </td>
          <td style={{ ...style.td }} className='td'>
            {item.price}
          </td>
          <td style={{ ...style.td }} className='td'>
            {item.qty * item.price}
          </td>
          <td style={{ ...style.td }} className='td'>
            <button
              type='button'
              className='btn-close'
              aria-label='Close'
              onClick={() => this.deleteRow(item.id)}></button>
          </td>
        </tr>
      );
    });

    let modelData = null;
    if (this.state.type) {
      modelData = (
        <div className='modal-body'>
          <div className='row'>
            <div className='col-6'>
              <label style={{ margin: "5px" }} htmlFor='inputMobileName'>
                Mobile Name
              </label>
              <input
                style={{ margin: "5px" }}
                type='text'
                className='form-control'
                id='inputMobileName'
                placeholder='Mobile Name'
                value={this.state.mobileName}
                onChange={(e) => this.update("mobileName", e)}
              />
            </div>
            <div className='col-6'>
              <label style={{ margin: "5px" }} htmlFor='inputDescription'>
                Description
              </label>
              <input
                style={{ margin: "5px" }}
                type='text'
                className='form-control'
                id='inputDescription'
                placeholder='Description'
                value={this.state.description}
                onChange={(e) => this.update("description", e)}
              />
            </div>
            <div className='col-6'>
              <label style={{ margin: "5px" }} htmlFor='IMEINo1'>
                IMEI No. 1
              </label>
              <input
                style={{ margin: "5px" }}
                type='text'
                className='form-control'
                id='IMEINo1'
                placeholder='IMEI No. 1'
                value={this.state.nos1}
                onChange={(e) => this.update("nos1", e)}
              />
            </div>
            <div className='col-6'>
              <label style={{ margin: "5px" }} htmlFor='IMEINo2'>
                IMEI No. 2
              </label>
              <input
                style={{ margin: "5px" }}
                type='text'
                className='form-control'
                id='IMEINo2'
                placeholder='IMEI No. 2'
                value={this.state.nos2}
                onChange={(e) => this.update("nos2", e)}
              />
            </div>
            <div className='col-6'>
              <label style={{ margin: "5px" }} htmlFor='BattaryNo'>
                Battary No.
              </label>
              <input
                style={{ margin: "5px" }}
                type='text'
                className='form-control'
                id='BattaryNo'
                placeholder='Battary No.'
                value={this.state.battaryNo}
                onChange={(e) => this.update("battaryNo", e)}
              />
            </div>
            <div className='col-6'>
              <label style={{ margin: "5px" }} htmlFor='ChargerNo'>
                Charger No.
              </label>
              <input
                style={{ margin: "5px" }}
                type='text'
                className='form-control'
                id='ChargerNo'
                placeholder='Charger No.'
                value={this.state.chargerNo}
                onChange={(e) => this.update("chargerNo", e)}
              />
            </div>
            <div className='col-6'>
              <label style={{ margin: "5px" }} htmlFor='quantity'>
                Quantity
              </label>
              <input
                style={{ margin: "5px" }}
                type='text'
                className='form-control'
                id='quantity'
                placeholder='Quantity'
                value={this.state.qty}
                onChange={(e) => this.update("qty", e)}
              />
            </div>
            <div className='col-6'>
              <label style={{ margin: "5px" }} htmlFor='price'>
                Price
              </label>
              <input
                style={{ margin: "5px" }}
                type='text'
                className='form-control'
                id='price'
                placeholder='Price'
                value={this.state.price}
                onChange={(e) => this.update("price", e)}
              />
            </div>
          </div>
        </div>
      );
    } else {
      modelData = (
        <div className='modal-body'>
          <div className='row'>
            <div className='col-12'>
              <label htmlFor='inputMobileName'>Product Name</label>
              <input
                type='text'
                className='form-control'
                id='inputMobileName'
                placeholder='Product Name'
                value={this.state.mobileName}
                onChange={(e) => this.update("mobileName", e)}
              />
            </div>
            <div className='col-6'>
              <label htmlFor='quantity'>Quantity</label>
              <input
                type='text'
                className='form-control'
                id='quantity'
                placeholder='Quantity'
                value={this.state.qty}
                onChange={(e) => this.update("qty", e)}
              />
            </div>
            <div className='col-6'>
              <label htmlFor='price'>Price</label>
              <input
                type='text'
                className='form-control'
                id='price'
                placeholder='Price'
                value={this.state.price}
                onChange={(e) => this.update("price", e)}
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <h1 style={{ textAlign: "center", color: "red" }}>
          Saloni Mobile Shop
        </h1>
        <form
          className='form-floating'
          style={{ width: "25%", margin: "auto" }}>
          <h3 style={{ textAlign: "center" }}>Fill Details</h3>
          <div className='form-floating mb-3'>
            <input
              type='text'
              className='form-control'
              id='floatingName'
              placeholder='Customer Name'
              value={this.state.name}
              onChange={(e) => this.update("name", e)}
            />
            <label htmlFor='floatingName'>Customer Name</label>
          </div>
          <div className='form-floating mb-3'>
            <textarea
              className='form-control'
              placeholder='Address'
              id='floatingTextarea'
              value={this.state.address}
              onChange={(e) => this.update("address", e)}
              style={{ height: "100px", resize: "none" }}></textarea>
            <label htmlFor='floatingTextarea'>Address</label>
          </div>
          <div className='form-floating mb-3'>
            <input
              type='text'
              className='form-control'
              id='floatingMobile'
              placeholder='Mobile Number'
              value={this.state.mobile}
              onChange={(e) => this.update("mobile", e)}
            />
            <label htmlFor='floatingMobile'>Mobile Number</label>
          </div>
        </form>

        <div className='row justify-content-center'>
          <button
            onClick={() => this.setState({ type: true })}
            style={{ width: "200px", margin: "10px" }}
            type='button'
            className='btn btn-primary'
            data-bs-toggle='modal'
            data-bs-target='#staticBackdrop'>
            Add Mobile
          </button>
          <button
            onClick={() => this.setState({ type: false })}
            style={{ width: "200px", margin: "10px" }}
            type='button'
            className='btn btn-primary'
            data-bs-toggle='modal'
            data-bs-target='#staticBackdrop'>
            Add Other
          </button>
        </div>

        <div
          className='modal fade'
          id='staticBackdrop'
          data-bs-backdrop='static'
          data-bs-keyboard='false'
          tabIndex='-1'
          aria-labelledby='staticBackdropLabel'
          aria-hidden='true'>
          <div className='modal-dialog modal-lg'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title' id='staticBackdropLabel'>
                  {this.state.type ? "Add Mobile" : "Add Other"}
                </h5>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'></button>
              </div>
              {modelData}
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-bs-dismiss='modal'>
                  Close
                </button>
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={this.addMobile}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        {this.state.items.length ? (
          <div style={{ width: "50%", margin: "auto" }}>
            <table style={style.table}>
              <thead>
                <tr>
                  <th style={{ ...style.column.five, ...style.td }}>Sr. No.</th>
                  <th style={{ ...style.column.one, ...style.td }}>
                    Particulars
                  </th>
                  <th style={{ ...style.column.two, ...style.td }}>Qty.</th>
                  <th style={{ ...style.column.three, ...style.td }}>Price</th>
                  <th style={{ ...style.column.four, ...style.td }}>Total</th>
                  <th style={{ ...style.column.siz, ...style.td }}>Delete</th>
                </tr>
              </thead>
              <tbody>
                {rowsData}

                <tr>
                  <td
                    colSpan='3'
                    style={{
                      ...style.td,
                      borderColor: "black black white white",
                    }}>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: "bold",
                        paddingTop: "10px",
                      }}>
                      Note : मोबाइल खरीदने के बाद मोबाइल में किसी भी प्रकार की
                      कमी आने पर ग्राहक को स्वयं ही सर्विस सेंटर जाना होगा,
                      दुकानदार से कोई मतलब नहीं है ।
                    </div>
                  </td>
                  <td style={{ ...style.td }}>Grand Total</td>
                  <td style={{ ...style.td }}>₹ {grandTotal}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : null}

        <div
          className='accordion accordion-flush'
          id='accordionFlushExample'
          style={{ width: "50%", margin: " 20px auto" }}>
          <div className='accordion-item'>
            <h2 className='accordion-header' id='flush-headingOne'>
              <button
                className='accordion-button collapsed '
                type='button'
                data-bs-toggle='collapse'
                data-bs-target='#flush-collapseOne'
                aria-expanded='false'
                aria-controls='flush-collapseOne'>
                <strong>See Preview</strong>
              </button>
            </h2>
            <div
              id='flush-collapseOne'
              className='accordion-collapse collapse'
              aria-labelledby='flush-headingOne'
              data-bs-parent='#accordionFlushExample'>
              <div className='accordion-body'>
                <div id='PrintArea'>
                  <div
                    style={{
                      padding: "2px",
                      margin: "5px",
                      border: "2px solid black",
                    }}>
                    <div
                      style={{
                        padding: "10px",
                        margin: "1px",
                        border: "1px solid black",
                      }}>
                      <div>
                        <div>
                          <div
                            style={{
                              textAlign: "right",
                              fontWeight: "bold",
                              clear: "none",
                              marginBottom: "-10px",
                              fontSize: "14px",
                            }}>
                            Mob : XXXXX04577
                          </div>
                          <div
                            style={{
                              fontSize: "45px",
                              fontWeight: "bold",
                              textAlign: "center",
                              color: "red",
                              paddingTop: "5px",
                            }}>
                            सलोनी मोबाइल शॉप
                          </div>
                          <div
                            style={{
                              fontSize: "15px",
                              fontWeight: "bold",
                              textAlign: "center",
                              color: "black",
                              marginTop: "0px",
                            }}>
                            चक्रपानपुर, कनैला रोड - आजमगढ़
                          </div>
                        </div>
                        <hr style={{ border: "1px solid black" }} />
                        <h4
                          style={{
                            textAlign: "center",
                            fontWeight: "bold",
                            margin: "0px",
                            fontSize: "16px",
                            textDecoration: "underline",
                          }}>
                          INVOICE
                        </h4>
                        <div>
                          <div
                            style={{
                              ...style.infoFieldLabel,
                              float: "right",
                              paddingRight: "20px",
                            }}>
                            Receipt No :{" "}
                            <span style={style.infoField}>
                              {this.state.receiptNo}
                            </span>
                          </div>
                          <div style={style.infoFieldLabel}>
                            Name :{" "}
                            <span style={style.infoField}>
                              {this.capitalize(this.state.name)}
                            </span>
                          </div>
                          <div
                            style={{
                              ...style.infoFieldLabel,
                              float: "right",
                              paddingRight: "20px",
                            }}>
                            Date :{" "}
                            <span style={style.infoField}>
                              {this.state.date}
                            </span>
                          </div>
                          <div style={style.infoFieldLabel}>
                            Address :{" "}
                            <span style={style.infoField}>
                              {this.capitalize(this.state.address)}
                            </span>
                          </div>
                          <div style={style.infoFieldLabel}>
                            Mobile :{" "}
                            <span style={style.infoField}>
                              {this.capitalize(this.state.mobile)}
                            </span>
                          </div>
                        </div>
                        <div>
                          <table style={style.table}>
                            <thead>
                              <tr>
                                <th
                                  style={{ ...style.column.five, ...style.td }}>
                                  Sr. No.
                                </th>
                                <th
                                  style={{ ...style.column.one, ...style.td }}>
                                  Particulars
                                </th>
                                <th
                                  style={{ ...style.column.two, ...style.td }}>
                                  Qty.
                                </th>
                                <th
                                  style={{
                                    ...style.column.three,
                                    ...style.td,
                                  }}>
                                  Price
                                </th>
                                <th
                                  style={{ ...style.column.four, ...style.td }}>
                                  Total
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {/* <tr>
                                <td style={{ ...style.td }}>1</td>
                                <td style={{ ...style.td }}>
                                  <div>
                                    <div style={{ fontSize: '16px' }}>Realme C11 2/32</div>
                                    <div>( Mast hai ) </div>
                                    <div style={{ width: '100%' }}><span style={{ fontSize: '12px' }}> IMEI No. : (Warranty - 12 Months)</span>
                                      <br />1. &nbsp; 2344325739857023&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;2. &nbsp; 2345234598723458
                                    </div>
                                    <div><span style={{ fontSize: '12px' }}> Battary No. (Guarantee - 6 Months) :</span>  SDFGSDFGSDFGSDSDFF</div>
                                    <div><span style={{ fontSize: '12px' }}>Charger No. (Guarantee - 6 Months) :</span>  SDFGSDFGSDFGSDSDFF</div>
                                  </div>
                                </td>
                                <td style={{ ...style.td }} className="td">1</td>
                                <td style={{ ...style.td }} className="td">7000</td>
                                <td style={{ ...style.td }} className="td">7000</td>
                              </tr> */}
                              {rows}

                              <tr>
                                <td
                                  colSpan='3'
                                  style={{
                                    ...style.td,
                                    borderColor: "black black white white",
                                  }}>
                                  <div
                                    style={{
                                      fontSize: "12px",
                                      fontWeight: "bold",
                                      paddingTop: "10px",
                                    }}>
                                    Note : मोबाइल खरीदने के बाद मोबाइल में किसी
                                    भी प्रकार की कमी आने पर ग्राहक को स्वयं ही
                                    सर्विस सेंटर जाना होगा, दुकानदार से कोई मतलब
                                    नहीं है ।
                                  </div>
                                </td>
                                <td style={{ ...style.td }}>Grand Total</td>
                                <td style={{ ...style.td }}>₹ {grandTotal}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div style={{ height: "100px" }}>
                          <div style={{ height: "60px" }}></div>
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: "bold",
                              float: "left",
                              marginLeft: "60px",
                            }}>
                            Customer Signature
                          </div>
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: "bold",
                              float: "right",
                              marginRight: "60px",
                            }}>
                            Saloni Mobile Shop
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: "center", margin: "15px" }}>
          <button className='btn btn-primary' onClick={this.print}>
            Print
          </button>
        </div>
      </div>
    );
  }
}

export default App;
