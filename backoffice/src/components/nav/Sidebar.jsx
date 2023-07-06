import React from "react";
import { HiInbox, HiViewBoards } from 'react-icons/hi';
import { Sidebar as FlowbiteSidebar } from "flowbite-react";
const { Items, ItemGroup, Item } = FlowbiteSidebar;

export default function Sidebar() {
    return (
        <FlowbiteSidebar className="mr-5 shadow-lg rounded-lg list-none list-inside w-full md:w-64 md:collapse-open">
            <Items>
                <ItemGroup>
                    <Item
                        href="/"
                    >
                        <p>
                            Home
                        </p>
                    </Item>
                    <Item
                        href="/events/tracking"
                        icon={HiViewBoards}
                        labelColor="dark"
                    >
                        <p>
                            Tracking Events
                        </p>
                    </Item>
                    <Item
                        href="/events/heatmap"
                        icon={HiInbox}
                    >
                        <p>
                            HeatMap
                        </p>
                    </Item>
                    <Item
                        href="#"
                        icon={HiInbox}
                    >
                        <p>
                            PageView
                        </p>
                    </Item>
                    <Item
                        href="#"
                        icon={HiInbox}
                    >
                        <p>
                            UserSession
                        </p>
                    </Item>
                    <Item
                        href="#"
                        icon={HiInbox}
                    >
                        <p>
                            Mes tunnels
                        </p>
                    </Item>
                    <Item
                        href="#"
                        icon={HiInbox}
                    >
                        <p>
                            Mes tags
                        </p>
                    </Item>
                </ItemGroup>
            </Items>
        </FlowbiteSidebar>
    );
};

