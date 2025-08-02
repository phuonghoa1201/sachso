import { EyeOutlined, EditOutlined, DeleteOutlined, PhoneOutlined, KeyOutlined } from "@ant-design/icons";
import { Select, Form, Button, Input, Table, Tag, Space, Breadcrumb } from "antd";
import styles from './TableQuestion.Module.css'
function TableQuestion({ questions, onUpdate, onView, onDelete,}) {
    const columns = [
        {
            title: '#',
            dataIndex: 'stt',
            key: 'stt',
        },
        {
            title: 'Khối lớp',
            dataIndex: 'class',
            key: 'class',
        },
        {
            title: 'Unit',
            dataIndex: 'unit',
            key: 'unit',
        },

        {
            title: 'Kỹ năng',
            dataIndex: 'skills',
            key: 'skills',
            render: (_, { skills = [] }) => (
                <>
                    {skills.map(skill => {
                        let color;
                        if (skill === 'L') {
                            color = 'gray';
                        } else if (skill === 'R') {
                            color = 'red';
                        } else if (skill === 'S') {
                            color = 'gold';
                        } else {
                            color = 'green';
                        }
                        return (
                            <Tag color={color} key={skill}>
                                {skill}
                            </Tag>
                        );
                    })}
                </>
            ),
            // filters to generate filter menu in columns
            filters: [
                { text: 'L', value: 'L' },
                { text: 'R', value: 'R' },
                { text: 'S', value: 'S' },
                { text: 'W', value: 'W' },
            ],
            onFilter: (value, record) => record.skills.includes(value),

        },
        {
            title: 'Câu hỏi',
            dataIndex: 'questionText',

            key: 'questionText',
            render: question => (
                <span>
                    <strong>Question: &nbsp;</strong>
                    {question}
                </span>
            )
        },
        {
            title: 'Loại câu hỏi',
            dataIndex: 'types',
            key: 'types',
            render: (type) => {
                if (type === 'multiple_choice') return 'Multiple Choice';
                if (type === 'fill_color') return 'Fill Color';
                return type;
            }
        },
        {
            title: 'Mức độ nhận thức',
            dataIndex: 'levels',
            key: 'levels',
        },
        {
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button shape="circle" icon={<EditOutlined />} type="dashed" onClick={() => {
                        console.log("UPDATE:", record);
                        onUpdate(record);

                    }}
                    />
                    <Button shape="circle" icon={<EyeOutlined />} type="dashed" onClick={() => {
                        console.log("VIEW:", record);
                        onView(record);

                    }}
                  
                    />
                    <Button shape="circle" icon={<DeleteOutlined />} danger type="dashed" onClick={() => {
                        console.log("DELETE", record)
                        onDelete(record);
                    }}
                    />


                </Space>
            ),
        },
    ];

    return (
        <div>
            {/* Table */}
            <Table columns={columns} 
             dataSource={questions}
             bordered className={`${styles.customHeader} px-4`} scroll={{ x: 'max-content' }} />
        </div>
    );



}
export default TableQuestion;