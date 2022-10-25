import React, {useEffect, useState} from "react";
import {useQuery} from "@apollo/client";
import {LOAD_USERS} from "../GraphQL/Queries";

const Users = () => {
    const {error, loading, data} = useQuery(LOAD_USERS);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (data) {
            setUsers(data.getAllUsers);
        }
    }, [data]);

    return (
        <div>
            {loading
                ? <div>Loading</div>
                : users.map((val) => {
                    return (
                    <h1>
                        {val.firstName}
                    </h1>
                  );
                })}
        </div>
    );
}

export default Users;
