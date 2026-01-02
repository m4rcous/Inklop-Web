import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import './MainLayout.css';

export const MainLayout: React.FC = () => {
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        // Obtener datos del usuario desde localStorage
        const userDataString = localStorage.getItem('user');
        if (userDataString) {
            const user = JSON.parse(userDataString);
            setUserData(user);
        }
    }, []);

    return (
        <div className="main-layout">
            <Sidebar
                userName={userData?.userName || userData?.businessName}
                businessImage={userData?.businessImage}
            />
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
};
