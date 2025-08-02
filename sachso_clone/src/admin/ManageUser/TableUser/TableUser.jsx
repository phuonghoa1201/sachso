import { UserOutlined, CalendarOutlined, MailOutlined, EditOutlined, DeleteOutlined, PhoneOutlined, KeyOutlined } from "@ant-design/icons";
import { Button, Table, Tag, Space } from "antd";
import dayjs from "dayjs";
function TableUser({ users, onDelete, onEdit, onView }) {
    console.log("Users in TableUser:", users);
    const columns = [
        {
            title: '#',
            dataIndex: 'stt',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Mã',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Tên người dùng',
            dataIndex: 'name',
            key: 'name',
            render: text => (
                <span>
                    <UserOutlined className="mr-2" />
                    {text.toUpperCase()}
                </span>
            )
        },
        // {
        //     title: 'Loại tài khoản',
        //     dataIndex: 'role',
        //     key: 'role',
        //     render: (_, { role }) => (
        //         <>
        //             {(Array.isArray(role) ? role : []).map(position => {
        //                 let color;
        //                 if (position === 'Học sinh') {
        //                     color = 'blue';
        //                 } else if (position === 'Giáo viên') {
        //                     color = 'gold';
        //                 } else {
        //                     color = 'red';
        //                 }
        //                 return (
        //                     <Tag color={color} key={position}>
        //                         {position}
        //                     </Tag>
        //                 );
        //             })}
        //         </>
        //     ),
        //     // filters to generate filter menu in columns
        //     filters: [
        //         { text: 'Học sinh', value: 'Học sinh' },
        //         { text: 'Giáo viên', value: 'Giáo viên' },
        //         { text: 'Nhân viên', value: 'Nhân viên' },
        //         { text: 'Khác', value: 'Khác' },
        //     ],
        //     onFilter: (value, record) =>
        //         Array.isArray(record.role) && record.role.includes(value),
        // },
        {
            title: 'Loại tài khoản',
            dataIndex: 'role',
            key: 'role',
            render: (_, { role }) => {
                let color = 'gray';
                let text = role || 'Khác';

                switch (role) {
                    case 'student':
                        color = 'blue';
                        text = 'Học sinh';
                        break;
                    case 'teacher':
                        color = 'gold';
                        text = 'Giáo viên';
                        break;
                    case 'staff':
                        color = 'red';
                        text = 'Nhân viên';
                        break;
                    default:
                        color = 'gray';
                        text = role || 'Khác';
                }

                return <Tag color={color}>{text}</Tag>;
            }
        },



        {
            title: 'Cấp',
            dataIndex: 'level', // 👉 đổi lại từ 'levels' nếu tên trong object là 'level'
            key: 'level',
            render: (_, { level }) => {
                let color = 'green';
                switch (level) {
                    case 'Cấp 1':
                        color = 'blue';
                        break;
                    case 'Cấp 2':
                        color = 'gold';
                        break;
                    case 'Cấp 3':
                        color = 'red';
                        break;
                    default:
                        color = 'green';
                }

                return <Tag color={color}>{level || 'Không xác định'}</Tag>;
            },
            filters: [
                { text: 'Cấp 1', value: 'Cấp 1' },
                { text: 'Cấp 2', value: 'Cấp 2' },
                { text: 'Cấp 3', value: 'Cấp 3' },
                { text: 'Khác', value: 'Khác' },
            ],
            onFilter: (value, record) => {
                if (value === 'Khác') {
                    return !['Cấp 1', 'Cấp 2', 'Cấp 3'].includes(record.level);
                }
                return record.level === value;
            },
        },

        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: email => (
                <span>
                    <MailOutlined className="mr-2" />
                    {email}
                </span>
            )
        },
        {
            title: 'Điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            render: phone => (
                <span>
                    <PhoneOutlined className="mr-2" />
                    {phone}
                </span>
            )
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'date',
            key: 'date',
            render: date => (
                <span>
                    <CalendarOutlined className="mr-2" />
                    {dayjs(date).format('DD/MM/YYYY HH:mm')}
                </span>
            )
        },
        {
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button shape="circle" icon={<EditOutlined />} type="dashed" onClick={() => {
                        console.log("EDIT:", record);
                        onEdit(record)
                    }} />
                    <Button shape="circle" icon={<KeyOutlined />} type="dashed" onClick={() => {
                        console.log("VIEW: ", record);
                        onView(record)
                    }} />
                    <Button shape="circle" icon={<DeleteOutlined />} danger type="dashed" onClick={() => {
                        console.log("DELETE:", record);
                        onDelete(record);
                    }} />


                </Space>
            ),
        },
    ];

    return (
        <div>
            {/* Table */}
            <Table columns={columns} dataSource={users.map(user => ({ ...user, key: user._id }))} rowKey={"_id"} bordered className="px-4" scroll={{ x: 'max-content' }} />
        </div>
    );

}
export default TableUser;