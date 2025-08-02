import { Modal, Form, Input } from 'antd';

function ForgotPassword({ openForgot, onCloseForgot }) {
    const handleFisnish = () =>{
        console.log("Submit Email sucessfully");
        

    }
  return (
    <div>
      <Modal
        title="QUÊN MẬT KHẨU"
        centered
        open={openForgot}
        onCancel={onCloseForgot}
        footer={null}
      >
        <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 h-full">
          <div className="w-full ">
            <Form layout="vertical" onFinish={handleFisnish}>
              <Form.Item
                label="Email"
                name="email"
              >
                <Input type="email" placeholder='Email của bạn' />
              </Form.Item>
              <Form.Item>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 w-full text-white p-1">
                  Gửi 
                </button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ForgotPassword;
