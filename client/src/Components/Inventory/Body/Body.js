import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import "./Body.css";
import { useSelector } from "react-redux";

function Body() {

    const mode = useSelector(state => state.darkMode);

    return (
        <>
            <div className="inventory-body-main">
                <div className="inventory-body-content">
                    <div className="inventory-body-list">
                        <div className="inventory-body-list-left" style={{backgroundColor:`${mode.bgCard}`, color:`${mode.colorCard}`}}>
                            <div className="inventory-table-head">
                                Your inventory items
                            </div>
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th>Category</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Actions</th>
                                    </tr>
                                    <tr style={{ textAlign: "left" }}>
                                        <td>Category</td>
                                        <td>Name</td>
                                        <td>Price</td>
                                        <td>
                                            <button
                                                type="submit"
                                                className="inventory-body-list-action btn-edit"
                                            >
                                                <EditIcon />
                                            </button>
                                            <button
                                                type="submit"
                                                className="inventory-body-list-action btn-delete"
                                            >
                                                <CancelIcon />
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="inventory-body-list-right">
                            <div className="inventory-body-forms" style={{backgroundColor:`${mode.bgCard}`, color:`${mode.colorCard}`}}>
                                <h2>Add Item</h2>
                                <form className="inventory-body-item-container-form">
                                    <div className="inventory-body-item-form-fieldDiv">
                                        <select
                                            className="field"
                                            name="category"
                                        >
                                            <option disabled selected value={null}>
                                                -Select Category-
                                            </option>
                                            <option value={null}>Name</option>
                                        </select>
                                    </div>
                                    <div className="fieldDiv">
                                        <input
                                            type="text"
                                            className="field"
                                            name="itemName"
                                            placeholder="Item name"
                                        />
                                    </div>
                                    <div className="warning">
                                        <p></p>
                                    </div>
                                    <div className="fieldDiv">
                                        <input
                                            type="text"
                                            className="field"
                                            name="price"
                                            placeholder="Item price"
                                        />
                                    </div>
                                    <div className="warning">
                                        <p></p>
                                    </div>
                                    <div className="fieldDiv">
                                        <input
                                            type="submit"
                                            style={{ cursor: "pointer" }}
                                            className="field submitBtn"
                                            value="Add item"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Body;
