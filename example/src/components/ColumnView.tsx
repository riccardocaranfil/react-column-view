import Section from "./Section";
import React from "react";
import classNames from "classnames";
import { useColumnView } from "react-column-view";

type ColumnViewItem = {
    id?: string;
    name: string;
};

const ColumnView = () => {
    const { insert, root, path, getChildren, push, getItem } = useColumnView<ColumnViewItem>();
    return (
        <div
            className={classNames(
                "rounded-xl p-2 min-h-[400px] flex bg-white overflow-auto gap-x-1"
            )}
        >
            <Section
                title={"Section 1"}
                onClick={() => {
                    insert({ name: "Child" });
                }}
            >
                {root?.map((item: string, index: number) => (
                    <div
                        key={index}
                        className={classNames("p-2 hover:bg-gray-100", {
                            "bg-gray-200": path.includes(item),
                        })}
                        onClick={() => {
                            push(item, 0);
                        }}
                    >
                        {getItem(item)?.name} {index}
                    </div>
                ))}
            </Section>

            {path?.map((item: string, sectionIndex: number) => (
                <Section
                    key={sectionIndex}
                    title={"Section " + (sectionIndex + 2)}
                    onClick={() => {
                        insert({ name: "Child " + (sectionIndex + 1) }, path[sectionIndex]);
                    }}
                >
                    {getChildren(item)?.map((child: ColumnViewItem, index: number) => {
                        return (
                            <div
                                key={index}
                                className={classNames("p-2 hover:bg-gray-100", {
                                    "bg-gray-200": path.includes(child.id),
                                })}
                                onClick={() => push(child.id, sectionIndex + 1)}
                            >
                                {getItem(child.id)?.name}.{index}
                            </div>
                        );
                    })}
                </Section>
            ))}
        </div>
    );
};

export default ColumnView;
