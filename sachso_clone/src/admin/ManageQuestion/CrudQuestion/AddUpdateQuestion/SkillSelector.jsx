import { useEffect, useState } from "react"
import { getSkillApi } from "../../../../util/question/dropdown"
import { Form, Select } from "antd"

function SkillSelector() {
    const [skillOptions, setSkillOptions] = useState([])
    // tạo state lưu mange giá trị được chọn
    const [selectedSkills, setSelectedSkills] = useState([])
    useEffect(() => {
        const loadSkill = async () => {
            const skills = await getSkillApi();
            console.log("Api skill", skills);

            const mappedSkill = skills.map(s => ({
                value: s._id,
                label: s.name
            }))
            setSkillOptions(mappedSkill)
        }
        loadSkill()
    }, [])
    return (
        <div>
            <Form.Item
                label={<span className=" rounded-t-lg bg-blue-500 uppercase text-white py-2 px-2">kỹ năng</span>}
                name="skillId"

            >
                <Select
                    placeholder="Chọn kỹ năng"
                    mode="multiple"
                    options={skillOptions}
                    value={selectedSkills}
                    onChange={(value) => setSelectedSkills(value)
                      
                    }
                />
            </Form.Item>
            {/* <Form.Item
                            label={<span className=" rounded-t-lg bg-blue-500 uppercase text-white py-2 px-2">kỹ năng</span>}
                            name="skills"
                        >
                            <Select
                                placeholder="Chọn kỹ năng"
                                mode="multiple"
                                options={[
                                    { value: "L", label: "L" },
                                    { value: "S", label: "S" },
                                    { value: "W", label: "W" },
                                    { value: "R", label: "R" },
                                ]}
                            />
                        </Form.Item> */}

        </div>
    )
}
export default SkillSelector