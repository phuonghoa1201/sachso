import { EyeOutlined, EditOutlined, DeleteOutlined, PhoneOutlined, KeyOutlined } from "@ant-design/icons";
import { Select, Form, Button, Input, Table, Tag, Space, Breadcrumb } from "antd";
import styles from './TableQuestion.Module.css'
function TableQuestion({ questions, onUpdate, onView, onDelete, }) {
    console.log("Question in TableQuestion:", questions);
    const columns = [
        {
            title: '#',
            dataIndex: 'stt',
            render: (text, record, index) => index + 1,
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
            render: (_, { skills = [] }) => {
                // Ánh xạ từ tên đầy đủ hoặc chữ thường sang ký tự viết hoa
                const skillMap = {
                    r: 'R',
                    reading: 'R',
                    s: 'S',
                    speaking: 'S',
                    l: 'L',
                    listening: 'L',
                    w: 'W',
                    writing: 'W',
                };

                return (
                    <>
                        {skills.map((skillRaw, index) => {
                            // Chuẩn hóa: chuyển về thường rồi tra map
                            const normalized = skillRaw?.toLowerCase?.();
                            const skill = skillMap[normalized] || skillRaw?.toUpperCase?.() || 'UNKNOWN';

                            let color;
                            if (skill === 'L') {
                                color = 'gray';
                            } else if (skill === 'R') {
                                color = 'red';
                            } else if (skill === 'S') {
                                color = 'gold';
                            } else if (skill === 'W') {
                                color = 'green';
                            } else {
                                color = 'blue'; // fallback cho giá trị lạ
                            }

                            return (
                                <Tag color={color} key={index}>
                                    {skill}
                                </Tag>
                            );
                        })}
                    </>
                );
            },
            filters: [
                { text: 'L', value: 'L' },
                { text: 'R', value: 'R' },
                { text: 'S', value: 'S' },
                { text: 'W', value: 'W' },
            ],
            onFilter: (value, record) => {
                // Chuẩn hóa skill trong record rồi kiểm tra có khớp không
                const skillMap = {
                    r: 'R',
                    reading: 'R',
                    s: 'S',
                    speaking: 'S',
                    l: 'L',
                    listening: 'L',
                    w: 'W',
                    writing: 'W',
                };
                return record.skills.some(skillRaw => {
                    const normalized = skillRaw?.toLowerCase?.();
                    const skill = skillMap[normalized] || skillRaw?.toUpperCase?.();
                    return skill === value;
                });
            },
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
                dataSource={questions.map(q => ({ ...q, key: q._id }))}
                bordered
                className={`${styles.customHeader} px-4`}
                scroll={{ x: 'max-content' }}
                pagination={{ pageSize: 20 }} />
        </div>
    );



}
export default TableQuestion;