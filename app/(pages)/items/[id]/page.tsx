"use client";

// import { fetchItem } from "@/app/api";
import { itemsAPI } from "@/app/api/items";
import { isIntString } from "@/app/utils";
import { useParams, notFound } from "next/navigation";
import { Item } from "@/app/types/items";
import { useEffect, useState } from "react";
import { Typography, Box, Paper, Container, Chip } from "@mui/material";
import Loading from "@/app/component/loading";
import ItemCard from "@/app/component/itemCard";
import NavBar from "@/app/component/navBar";
import ItemsTableContainer from "@/app/component/itemTableContainer";

export default function ItemPage() {
    const params = useParams();
    const [item, setItem] = useState<Item | null>(null);
    const [itemID, setItemID] = useState<string | null>(null);
    const [isItemLoading, setIsItemLoading] = useState<boolean>(true);

    const fetchItem = async (params_id: string) => {
        setIsItemLoading(true);
        try {
            const res = await itemsAPI.fetchItem(params_id);
            if (res.success) {
                setItem(res.data);
            } else {
                notFound(); // 404 error
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsItemLoading(false);
        }
    };
    
    useEffect(() => {
        const params_id = params.id;
        if (typeof params_id !== "string" || !isIntString(params_id)) {
            notFound(); // 404 error
        }
        setItemID(params_id);
        fetchItem(params_id);
    }, [params.id]);
    
    if (isItemLoading) {
        return <Loading />;
    }
    
    if (itemID === null || item === null) {
        return (
            <Container>
                <Typography variant="h4" gutterBottom>
                    Item not found
                </Typography>
            </Container>
        );
    }
    
    return (
        <>
            <NavBar />
            <ItemCard item={item} />
            <ItemsTableContainer />
        </>
    );
}
