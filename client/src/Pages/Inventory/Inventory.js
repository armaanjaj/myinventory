import React, { useState } from "react";
import Footer from "../../Components/Footer/Footer";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import "./Inventory.css";
import { useSelector } from "react-redux";
import Navigation from "../../Components/Navigation/Navigation";

function Inventory() {
    const mode = useSelector((state) => state.darkMode);
    const [searchBox, setSearchBox] = useState(false);

    const inventoryArray = [
        {
            category: "Kitchen",
            item: "Fan",
            price: 15.99,
        },
        {
            category: "Bedroom",
            item: "Clock",
            price: 30.0,
        },
        {
            category: "Garage",
            item: "Stand",
            price: 9.99,
        },
        {
            category: "Living room",
            item: "TV",
            price: 1099.99,
        },
        {
            category: "Office",
            item: "Table",
            price: 50.0,
        },
        {
            category: "Kitchen",
            item: "Fan",
            price: 15.99,
        },
        {
            category: "Bedroom",
            item: "Clock",
            price: 30.0,
        },
        {
            category: "Garage",
            item: "Stand",
            price: 9.99,
        },
        {
            category: "Living room",
            item: "TV",
            price: 1099.99,
        },
        {
            category: "Office",
            item: "Table",
            price: 50.0,
        },
        {
            category: "Kitchen",
            item: "Fan",
            price: 15.99,
        },
        {
            category: "Bedroom",
            item: "Clock",
            price: 30.0,
        },
        {
            category: "Garage",
            item: "Stand",
            price: 9.99,
        },
        {
            category: "Living room",
            item: "TV",
            price: 1099.99,
        },
        {
            category: "Office",
            item: "Table",
            price: 50.0,
        },
    ];

    return (
        <>
        <Navigation/>
            <div className="inventory-body-main">
                <div className="inventory-body-content">
                    <div className="inventory-body-list">
                        <div
                            className="inventory-body-list-left"
                            style={{
                                backgroundColor: `${mode.bgCard}`,
                                color: `${mode.colorCard}`,
                            }}
                        >
                            <div className="inventory-table-head">
                                <div>
                                    {inventoryArray.length > 0
                                        ? `You have ${inventoryArray.length} ${
                                              inventoryArray.length > 1
                                                  ? "items"
                                                  : "item"
                                          } in your inventory`
                                        : "You don't have any items yet"}
                                </div>
                                <div className="inventory-body-searchbox">
                                    {searchBox ? (
                                        <div>
                                            <input
                                                type="text"
                                                className="field search-item"
                                                name="itemSearch"
                                                placeholder="Search item"
                                                style={{
                                                    backgroundColor: `${mode.bgCard}`,
                                                    color: `${mode.colorCard}`,
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                    <span
                                        onClick={() => {
                                            setSearchBox(!searchBox);
                                        }}
                                        className="inventory-body-searchbox"
                                    >
                                        {searchBox ? (
                                            <>
                                                <CloseIcon />
                                            </>
                                        ) : (
                                            <SearchIcon />
                                        )}
                                    </span>
                                </div>
                            </div>
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th>Category</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th colSpan={2}>Actions</th>
                                    </tr>
                                    {inventoryArray.map((item, i) => (
                                        <tr
                                            key={i}
                                            style={{ textAlign: "left" }}
                                        >
                                            <td>{item.category}</td>
                                            <td>{item.item}</td>
                                            <td>{item.price}</td>
                                            <td>
                                                <button
                                                    type="submit"
                                                    className="inventory-body-list-action btn-edit"
                                                >
                                                    <EditIcon />
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    type="submit"
                                                    className="inventory-body-list-action btn-delete"
                                                >
                                                    <CancelIcon />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="inventory-body-list-right">
                            <div
                                className="inventory-body-forms"
                                style={{
                                    backgroundColor: `${mode.bgCard}`,
                                    color: `${mode.colorCard}`,
                                }}
                            >
                                <h2>Add Item</h2>
                                <form className="inventory-body-item-container-form" onSubmit={(e)=>{e.preventDefault()}}>
                                    <div className="inventory-body-item-form-fieldDiv">
                                        <select
                                            className="field"
                                            name="category"
                                            style={{
                                                backgroundColor: `${mode.bgCard}`,
                                                color: `${mode.colorCard}`,
                                            }}
                                        >
                                            <option
                                                disabled
                                                // selected
                                                defaultValue={null}
                                            >
                                                -Select Category-
                                            </option>
                                            <option value={null}>Name</option>
                                        </select>
                                    </div>
                                    <div className="fieldDiv  py-[0.5rem] px-0">
                                        <input
                                            type="text"
                                            className="field"
                                            name="itemName"
                                            placeholder="Item name"
                                            style={{
                                                backgroundColor: `${mode.bgCard}`,
                                                color: `${mode.colorCard}`,
                                            }}
                                        />
                                    </div>
                                    <div className="warning">
                                        <p></p>
                                    </div>
                                    <div className="fieldDiv  py-[0.5rem] px-0">
                                        <input
                                            type="text"
                                            className="field"
                                            name="price"
                                            placeholder="Item price"
                                            style={{
                                                backgroundColor: `${mode.bgCard}`,
                                                color: `${mode.colorCard}`,
                                            }}
                                        />
                                    </div>
                                    <div className="warning">
                                        <p></p>
                                    </div>
                                    <div className="fieldDiv  py-[0.5rem] px-0">
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
            <Footer />
        </>
    );
}

export default Inventory;
