import React from "react";
import "../Inventory.css";

function Body() {
    return (
        <>
            <div className="content">
                <article className="content-main">
                    <div className="listTable">
                        <table className="table">
                            <tr>
                                <th>Category</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th></th>
                            </tr>
                            <tr style={{ textAlign: "left" }}>
                                <td>Category</td>
                                <td>Name</td>
                                <td>Price</td>
                                <td>
                                    <form method="POST" action="/inventory">
                                        <input
                                            type="hidden"
                                            name="editItem"
                                            value="<%=item.item_id%>"
                                        />
                                        <input
                                            type="hidden"
                                            name="action"
                                            value="edit"
                                        />
                                        <input
                                            type="submit"
                                            style={{
                                                cursor: "pointer",
                                                padding: "3px 5px",
                                            }}
                                            value="Edit"
                                        />
                                    </form>
                                </td>
                                <td>
                                    <form method="POST" action="/inventory">
                                        <input
                                            type="hidden"
                                            name="deleteItem"
                                            value="<%=item.item_id%>"
                                        />
                                        <input
                                            type="hidden"
                                            name="action"
                                            value="delete"
                                        />
                                        <input
                                            type="submit"
                                            style={{
                                                cursor: "pointer",
                                                padding: "3px 5px",
                                            }}
                                            value="Delete"
                                        />
                                    </form>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div className="advertiseSection">
                        <h2 className="insideText">
                            We're here to manage,
                            <br />
                            so you can focus on your work!
                        </h2>
                    </div>
                </article>
            </div>

            <div className="editItemContainer">
                <div className="editItemForm">
                    <h2>Edit Item</h2>
                    <form
                        method="POST"
                        action="/inventory"
                        className="addItemFormContainer"
                    >
                        <div className="fieldDiv">
                            <select className="field" name="category">
                                <option value="<%=cat.category_id%>">
                                    Name
                                </option>
                                <option value="<%=cat.category_id%>">
                                    Name
                                </option>
                                <option value="<%=cat.category_id%>">
                                    Name
                                </option>
                                <option value="<%=cat.category_id%>">
                                    Name
                                </option>
                            </select>
                        </div>
                        <div className="fieldDiv">
                            <input
                                type="text"
                                className="field"
                                name="edit_itemName"
                                value="<%= edit_itemName%>"
                                placeholder="Item name"
                            />
                        </div>
                        <div className="warning">
                            <p>Description</p>
                        </div>
                        <div className="fieldDiv">
                            <input
                                type="text"
                                className="field"
                                name="edit_price"
                                value="<%= edit_price%>"
                                placeholder="Item price"
                            />
                        </div>
                        <div className="warning">
                            <p>Description</p>
                        </div>
                        <div className="fieldDiv">
                            <input type="hidden" name="action" value="update" />
                            <input
                                type="submit"
                                style={{ cursor: "pointer" }}
                                className="field submitBtn"
                                value="Update"
                                onclick="closeOverlay()"
                            />
                        </div>
                    </form>
                </div>
            </div>

            <span class="addItemLink" onclick="openOverlay()">
                Add Items
            </span>

            <div id="myNav" class="overlay">
                <a
                    href="javascript:void(1)"
                    class="closebtn"
                    onclick="closeOverlay()"
                >
                    &times;
                </a>
                <div class="overlay-content">
                    <h2>Add Item</h2>
                    <form
                        method="POST"
                        action="/inventory"
                        class="addItemFormContainer"
                    >
                        <div class="fieldDiv">
                            <select class="field" name="category">
                                <option value="<%=cat.category_id%>">
                                    Name
                                </option>
                                <option value="<%=cat.category_id%>">
                                    Name
                                </option>
                                <option value="<%=cat.category_id%>">
                                    Name
                                </option>
                                <option value="<%=cat.category_id%>">
                                    Name
                                </option>
                            </select>
                        </div>
                        <div class="fieldDiv">
                            <input
                                type="text"
                                class="field"
                                name="itemName"
                                value="<%=itemName%>"
                                placeholder="Item name"
                            />
                        </div>
                        <div class="fieldDiv">
                            <input
                                type="text"
                                class="field"
                                name="price"
                                value="<%=price%>"
                                placeholder="Item price"
                            />
                        </div>
                        <div class="fieldDiv">
                            <input
                                type="submit"
                                style={{ cursor: "pointer" }}
                                class="field submitBtn"
                                value="Save"
                                onclick="closeOverlay()"
                            />
                        </div>
                    </form>
                </div>
            </div>

            <div class="pageBodySection"></div>
        </>
    );
}

export default Body;
