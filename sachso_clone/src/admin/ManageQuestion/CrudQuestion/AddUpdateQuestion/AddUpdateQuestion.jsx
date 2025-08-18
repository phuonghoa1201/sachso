import { Modal, Form, Input, Select, Upload, Button, Checkbox } from "antd";
import { UploadOutlined, MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import UnitGradeSelector from "./UnitGradeSelector";
import SkillSelector from "./SkillSelector";
import QuestionTypeSelector from "./QuestionTypeSelector";
import CognitionSelector from "./CognitionSelector";
import { addQuestionApi, editQuestionApi, uploadFileApi } from "../../../../util/api";

function AddQuestion({ openAddQuestion, closeAddQuestion, addQuestion, updateQuestion, editingQuestion }) {
    const [form] = Form.useForm();

    // state audio / image
    const [audioUrl, setAudioUrl] = useState("");
    const [imgUrl, setImgUrl] = useState("");

    // Lưu file thực tế (gửi lên API uploadFileApi)
    const [audioFile, setAudioFile] = useState(null);
    const [imgFile, setImgFile] = useState(null);

    // state câu hỏi
    const [questionType, setQuestionType] = useState("Multiple Choice");
    const [answersType, setAnswersType] = useState("text");
    const [answers, setAnswers] = useState([
        { value: "", isCorrect: null },
        { value: "", isCorrect: null },
        { value: "", isCorrect: null },
    ]);

    // state requirement từ dropdown (text)
    const [selectedRequirement, setSelectedRequirement] = useState("");

    useEffect(() => {
        if (editingQuestion) {
            // Reset form trước
            form.resetFields();

            // Set answersType và answers trước
            setAnswersType(editingQuestion.answerType || "text");
            const mappedAnswers = (editingQuestion.answers || []).map(ans => ({
                value: ans.text || ans.imageUrl || "",
                isCorrect: ans.isCorrect ?? false,
            }));
            setAnswers(mappedAnswers);

            // Set các state khác
            setQuestionType(editingQuestion.questionType || "Multiple Choice");
            setAudioUrl(editingQuestion.audioUrl || "");
            setImgUrl(editingQuestion.imageUrl || "");
            setSelectedRequirement(editingQuestion.requirement || "");

            // Set form fields, chỉ dùng id cho Select
            form.setFieldsValue({
                gradeId: editingQuestion.gradeId?._id || null,
                unitId: editingQuestion.unitId?._id || null,
                skillId: editingQuestion.skillId?._id || null,
                questionTypeId: editingQuestion.questionTypeId?._id || null,
                cognitionLevelId: editingQuestion.cognitionLevelId?._id || null,
                readingContent: editingQuestion.readingText || "",
                content: editingQuestion.content || "",
            });
        } else {
            form.resetFields();
            setAnswersType("text");
            setAnswers([
                { value: "", isCorrect: null },
                { value: "", isCorrect: null },
                { value: "", isCorrect: null },
            ]);
            setQuestionType("Multiple Choice");
            setAudioUrl("");
            setImgUrl("");
            setSelectedRequirement("");
        }
    }, [editingQuestion, form]);



    const onFinish = async (values) => {
        try {
            // Khởi tạo url cuối cùng
            let uploadedAudioUrl = audioUrl;
            let uploadedImgUrl = imgUrl;

            // upload file nếu có file thật
            // if (audioFile || imgFile) {
            //     const uploadResponse = await uploadFileApi(imgFile || null, audioFile || null);
            //     uploadedImgUrl = uploadResponse.imageUrl || uploadedImgUrl;
            //     uploadedAudioUrl = uploadResponse.audioUrl || uploadedAudioUrl;
            // }

            if (audioFile) {
                const audioRes = await uploadFileApi(null, audioFile);
                uploadedAudioUrl = audioRes.audioUrl || uploadedAudioUrl;
            }

            if (imgFile) {
                const imgRes = await uploadFileApi(imgFile, null);
                uploadedImgUrl = imgRes.imageUrl || uploadedImgUrl;
            }
            const updatedData = {
                gradeId: values.gradeId,
                unitId: values.unitId,
                skillId: values.skillId,
                questionTypeId: values.questionTypeId,
                cognitionLevelId: values.cognitionLevelId,
                requirement: selectedRequirement,
                audioUrl: uploadedAudioUrl,
                imageUrl: uploadedImgUrl,
                readingText: values.readingContent,
                content: values.content,
                answerType: answersType,
                answers: answers.map(a =>
                    answersType === "text"
                        ? { text: a.value, isCorrect: a.isCorrect ?? false }
                        : { imageUrl: a.value, isCorrect: a.isCorrect ?? false }
                ),
            }

            if (editingQuestion) {
                const res = await editQuestionApi(editingQuestion._id, updatedData);
                if (res.EC === 0) {
                    alert("Chỉnh sửa câu hỏi thành công!");
                    updateQuestion(res.DT);
                    console.log("Edit response", res.DT);

                    form.resetFields();
                    closeAddQuestion();
                } else {
                    alert("Sửa câu hỏi thất bại: " + (res.error || ""));
                }
            } else {
                const res = await addQuestionApi(

                    updatedData.gradeId,
                    updatedData.unitId,
                    updatedData.skillId,
                    updatedData.questionTypeId,
                    updatedData.cognitionLevelId,
                    updatedData.requirement,
                    updatedData.audioUrl,
                    updatedData.imageUrl,
                    updatedData.readingText,
                    updatedData.content,
                    updatedData.answerType,
                    updatedData.answers
                );
                console.log("Dữ liệu gửi lên:", updatedData);
                console.log("Kết quả trả về từ API:", res);

                if (res.EC === 0) {
                    alert("Thêm câu hỏi thành công!");
                    // dùng data được trả về từ backend
                    const newQuestion = res.DT || updatedData;
                    //  cập nhật state ngay lập tức
                    addQuestion(newQuestion);
                    form.resetFields();
                    setAnswers([
                        { value: "", isCorrect: null },
                        { value: "", isCorrect: null },
                        { value: "", isCorrect: null },
                    ]);
                    setAudioUrl("");
                    setImgUrl("");
                    setSelectedRequirement("");
                    closeAddQuestion();
                } else {
                    alert("Thêm câu hỏi thất bại: " + (res.data.error || ""));
                }
            }
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
            alert("Đã xảy ra lỗi khi thêm/cập nhật câu hỏi");
        }
    };

    // handle file upload / paste link
    const handleAudioFileUpload = (file) => {
        setAudioFile(file)    //Lưu file để upload
        setAudioUrl(URL.createObjectURL(file));
        return false;
    };
    const handlePasteLinkAudio = (e) => {
        setAudioFile(null)
        setAudioUrl(e.target.value.trim());

    }

    const handleImgFileUpload = (file) => {
        setImgFile(file)
        setImgUrl(URL.createObjectURL(file));
        return false;
    };
    const handlePasteImgLink = (e) => {
        setImgFile(null)
        setImgUrl(e.target.value.trim());

    }
    const onAnswerChange = (index, val) => {
        const newAnswers = [...answers];
        newAnswers[index].value = val;
        setAnswers(newAnswers);
    };
    const toggleCorrect = (index, isTrue) => {
        const newAnswers = [...answers];
        newAnswers[index].isCorrect = isTrue;
        setAnswers(newAnswers);
    };
    const addAnswers = () => setAnswers([...answers, { value: "", isCorrect: null }]);

    return (
        <Modal
            title={editingQuestion ? "CẬP NHẬT CÂU HỎI" : "THÊM CÂU HỎI"}
            centered
            open={openAddQuestion}
            onCancel={closeAddQuestion}
            width="80%"
            footer={null}
        >
            <Form form={form} onFinish={onFinish} layout="vertical" className="space-y-4">
                <div className="max-h-[80vh] overflow-y-auto grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1 space-y-4">
                        <UnitGradeSelector form={form} editingQuestion={editingQuestion} />
                        <SkillSelector form={form} editingQuestion={editingQuestion} />
                        <QuestionTypeSelector form={form} editingQuestion={editingQuestion} />

                        <Form.Item
                            label={<span className="rounded-t-lg bg-blue-500 uppercase text-white py-2 px-2">Yêu cầu đề bài</span>}
                        >
                            <Select
                                placeholder="Chọn yêu cầu"
                                name="requirement"
                                value={selectedRequirement}
                                onChange={setSelectedRequirement}
                                options={[
                                    { value: "Listen, read and tick the correct answer.", label: "Listen, read and tick the correct answer." },
                                    { value: "Look at the picture and write the missing word.", label: "Look at the picture and write the missing word." },
                                ]}
                            />
                        </Form.Item>

                        <CognitionSelector form={form} editingQuestion={editingQuestion} />
                    </div>

                    <div className="md:col-span-2 space-y-4">
                        <Form.Item label="Link audio" name="audioUrl">
                            <div className="flex flex-row">
                                {/* <Input placeholder="https://..." value={audioUrl} onChange={handlePasteLinkAudio} /> */}
                                <Input
                                    placeholder="https://..."
                                    value={audioUrl}
                                    onChange={handlePasteLinkAudio}
                                    disabled={selectedRequirement === 'Look at the picture and write the missing word.'}

                                />
                                <Upload beforeUpload={handleAudioFileUpload} showUploadList={false} accept="audio/*">
                                    {/* <Button icon={<UploadOutlined />}>Audio Upload</Button> */}
                                    <Button disabled={audioUrl !== "" || selectedRequirement === 'Look at the picture and write the missing word.'} icon={<UploadOutlined />}>Audio Upload</Button>
                                </Upload>
                            </div>
                        </Form.Item>

                        {audioUrl && <audio controls style={{ marginTop: 8, width: "100%" }} src={audioUrl} />}

                        <Form.Item label="Link hình ảnh" name="imageUrl">
                            <div className="flex flex-row">
                                {/* <Input placeholder="https://..." value={imgUrl} onChange={handlePasteImgLink} /> */}
                                <Input
                                    placeholder="https://..."
                                    value={imgUrl}
                                    onChange={handlePasteImgLink}
                                    disabled={selectedRequirement === 'Listen, read and tick the correct anwser.'}

                                />
                                <Upload beforeUpload={handleImgFileUpload} showUploadList={false} accept="image/*">
                                    {/* <Button icon={<UploadOutlined />}>Image Upload</Button> */}
                                    <Button disabled={imgUrl !== "" || selectedRequirement === 'Listen, read and tick the correct anwser.'} icon={<UploadOutlined />}>Image Upload</Button>
                                </Upload>
                            </div>
                        </Form.Item>

                        {imgUrl && <img src={imgUrl} alt="Hình ảnh preview" className="block mx-auto mt-2 w-1/3 h-auto max-h-1/3" />}

                        <Form.Item name="readingContent" label="Nội dung bài đọc (nếu có)">
                            <Input.TextArea rows={4} />
                        </Form.Item>

                        {questionType === "Multiple Choice" && (
                            <>
                                <div className="p-4 border border-gray-200  shadow-sm bg-white">
                                    <h3 className="border-b border-gray-300 w-full py-2">Câu 1</h3>
                                    <Form.Item label="Loại đáp án là " className="my-2">
                                        <Select value={answersType} onChange={(val) => {
                                            console.log('User chọn answersType:', val);
                                            setAnswersType(val);
                                            // reset after change form
                                            setAnswers([
                                                { value: "" },
                                                { value: "" },
                                                { value: "" },
                                            ])
                                        }}>
                                            <Select.Option value="text">Chữ cái</Select.Option>
                                            <Select.Option value="image">Hình ảnh</Select.Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        label="Nhập nội dung câu hỏi"
                                        name="content"
                                        className="my-2"

                                    >
                                        <Input.TextArea placeholder="..." rows={1} />
                                    </Form.Item>

                                    <div className="flex justify-between">
                                        <label>Các đáp án</label>
                                        <label>Đúng/Sai</label>
                                    </div>

                                    {answers.map((ans, index) => (

                                        <Form.Item
                                            key={index}
                                            required
                                            rules={[{ required: true, message: `Vui lòng nhập đáp án ${String.fromCharCode(65 + index)}` }]}
                                        >
                                            <div className="grid grid-cols-[9fr_1fr] items-center gap-4">
                                                {/* Cột 1: chữ cái A, B, C */}
                                                {answersType === 'text' ? (
                                                    <Input
                                                        addonBefore={String.fromCharCode(65 + index) + '.'}
                                                        value={ans.value || ""}
                                                        onChange={(e) => onAnswerChange(index, e.target.value)}
                                                        className="w-full"
                                                    />
                                                ) : (
                                                    <div className="flex items-center gap-4">
                                                        <Input
                                                            addonBefore={String.fromCharCode(65 + index) + '.'}
                                                            value={ans.value || ""}
                                                            onChange={(e) => onAnswerChange(index, e.target.value)}
                                                            className="w-full"
                                                        />
                                                        {ans.value && (
                                                            <img

                                                                src={ans.value}
                                                                alt={`Đáp án ${String.fromCharCode(65 + index)}`}
                                                                className="w-28 h-28 object-contain border border-gray-300 rounded"
                                                            />
                                                        )}
                                                    </div>
                                                )}

                                                {/* Cột 3: Checkbox đúng/sai */}
                                                <div className="flex gap-6 justify-center">
                                                    <Checkbox
                                                        checked={ans.isCorrect === true}
                                                        onChange={() => toggleCorrect(index, true)}
                                                    >
                                                    </Checkbox>
                                                    <Button shape="circle"
                                                        type={ans.isCorrect === false ? "danger" : "default"}
                                                        onClick={() => toggleCorrect(index, false)}
                                                        style={{
                                                            borderColor: ans.isCorrect === false ? '#ff4d4f' : undefined
                                                        }}

                                                    >
                                                        <MinusCircleOutlined style={{ color: 'red' }} />
                                                    </Button>
                                                </div>

                                            </div>

                                        </Form.Item>
                                    ))}
                                    <Button type="dashed" onClick={addAnswers} size="small">
                                        <PlusCircleOutlined /> Thêm đáp án
                                    </Button>
                                </div>

                            </>
                        )}
                        <div className="flex justify-end gap-4 mt-4">
                            <Button onClick={closeAddQuestion}>Đóng</Button>
                            <Button type="primary" htmlType="submit">
                                Lưu
                            </Button>
                        </div>
                    </div>
                </div>
            </Form>

        </Modal >


    );
}
export default AddQuestion;