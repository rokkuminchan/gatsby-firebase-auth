import React, { useEffect, useState } from "react"
import styled from 'styled-components';
import { addOrUpdateHistoryItem, loadTestingData } from "../api/testingHistory";


const Input = styled.input.attrs({ type: 'text' })`
    cursor: pointer;
    margin-bottom: 0;
    width: 100px;
    border-radius: 5px;
    height: 35px;
    -webkit-transition: 0.15s;
    transition: 0.15s;
    text-align: center;
    display: inline-block;
    margin: 5px;
`

const Profile = () => {
    const [needsReloading, setNeedsReloading] = useState(true);
    const [testingHistoryData, setTestingHistoryData] = useState([]);
    const [currentHistory, setCurrentHistory] = useState();

    useEffect(() => {
        loadTestingData().then(data => {
            setTestingHistoryData([]);
            setNeedsReloading(false);
            setTestingHistoryData(data);
        })
    }, [needsReloading]);

    function onSelected(item) {
        item = item || { name: "", executedDate: new Date() };

        setCurrentHistory(item);
    }

    function onNameChange(e) {
        setCurrentHistory({ ...currentHistory, name: e.target.value });
    }

    function onSave() {
        if (!currentHistory.name || currentHistory.name.trim().length === 0) {
            return alert("Name is required!");
        }

        addOrUpdateHistoryItem(currentHistory)
            .then(() => {
                onReset();
                setNeedsReloading(true);
            });
    }

    function onReset() {
        setCurrentHistory(null);
    }

    return <main>
        <ul>
            {
                testingHistoryData.map((item) => {
                    return <li key={item.id} onClick={() => onSelected(item)}>{item.name}</li>
                })
            }
        </ul>
        <br />
        {currentHistory ? null : <Input value="Add new item" onClick={() => onSelected(null)} />}
        {
            currentHistory && <section>
                <input type="text" placeholder="Enter name..." value={currentHistory.name} onChange={onNameChange} />

                <div>
                    <Input value="Cancel" onClick={onReset} />
                    <Input value="Save" onClick={onSave} />
                </div>
            </section>
        }
    </main>
}

export default Profile