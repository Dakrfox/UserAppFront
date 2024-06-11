import React from 'react';
import { PrimaryBtn, SecondaryBtn, ghostBtn } from '@/components/ButtonComponent';
import CardComponent from '@/components/CardComponent';
import InputComponent from '@/components/InputComponent';
import MenuComponent, { MenuItem } from '@/components/MenuComponent';
import { HiArchiveBox } from "react-icons/hi2";
import ContainerComponent from '@/components/ContainerComponent';



export default function PruebaComponents() {
    return (
        <>
        <MenuComponent >
                <MenuItem icon={<HiArchiveBox  size={20} />} text="Menu 1" active/>
                <MenuItem icon={<HiArchiveBox  size={20}  />} text="Menu 2" />
                <MenuItem icon={<HiArchiveBox  size={20}  />} text="Menu 3" alert/>
                <MenuItem icon={<HiArchiveBox  size={20}  />} text="Menu 4" />
            </MenuComponent>

            <ContainerComponent>
                <PrimaryBtn value="Click Me" className="max-w-md" />
                <SecondaryBtn value="Click Me" className="max-w-md" />
                <InputComponent 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email"
                    className="max-w-md"
                />
                <InputComponent 
                    id="email" 
                    type="password" 
                    placeholder="Enter your email"
                    className="max-w-md"
                />
                <InputComponent 
                    id="email" 
                    type="text" 
                    placeholder="Enter your email"
                    className="max-w-md"
                />
                <InputComponent 
                    id="email" 
                    type="number" 
                    placeholder="Enter your email"
                    className="max-w-md"
                />
                <InputComponent 
                    id="email" 
                    type="date" 
                    placeholder="Enter your email"
                    className="max-w-md"
                />
                <InputComponent 
                    id="email" 
                    type="file" 
                    placeholder="Enter your email"
                    className="max-w-md"
                />
            </ContainerComponent>
            <CardComponent 
                title="Title" description="Description" image="https://img.logoipsum.com/243.svg"/>
        </>
    )
}
