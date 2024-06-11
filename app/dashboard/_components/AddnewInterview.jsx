"use client";
import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAimodal";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function AddnewInterview() {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [jobPosition, setJobPosition] = useState();
    const [jobDescription, setJobDescription] = useState();
    const [jobExperience, setJobExperience] = useState();
    const [JsonResponse, setJsonResponse] = useState([]);
    const router = useRouter()
    const { user } = useUser();
    const onSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        console.log(jobDescription, jobExperience, jobPosition);
        const inputPrompt =
            "Job position: " +
            jobPosition +
            ", Job Description: " +
            jobDescription +
            ", Years of Experience: " +
            jobExperience +
            ", Depends on Job Position, JobDescription & Years of Experience give us 10 Interview question along with Answer in JSON format, Give us question and answer field on JSON";
        const result = await chatSession.sendMessage(inputPrompt);
        const changedResult = (result.response.text()).replace('```json', '').replace('```', '')
        setJsonResponse(changedResult)
        if (changedResult) {
            const resp = await db.insert(MockInterview)
                .values({
                    mockId: uuidv4(),
                    jsonMockResp: changedResult,
                    jobPosition: jobPosition,
                    jobDesc: jobDescription,
                    jobExperience: jobExperience,
                    createdBy: user?.primaryEmailAddress.emailAddress,
                    createdAt: moment().format("DD-MM-yyyy")
                }).returning({ mockId: MockInterview.mockId });

            console.log("Inserted Id:", resp)
            setLoading(false)
            if (resp) {
                setOpen(false)
                router.push('/dashboard/interview/' + resp[0]?.mockId)
            }

        } else {
            toast("Unsuccessfull Error")
        }




    };
    return (
        <div className="-mx-5">
            <div
                onClick={() => {
                    setOpen(true);
                }}
                className="mx-20 my-5 border p-10 rounded-xl hover:shadow-primary shadow-xl cursor-pointer hover:text-primary font-bold transition-all duration-700 "
            >
                <h1 className="">Add New Interview</h1>
            </div>
            <Dialog open={open}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Tell us more about your Job Interview? </DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onSubmit}>
                                <div>
                                    <h2>
                                        Add details about your Job
                                        description,Exeperience,Position/role of the job
                                    </h2>
                                </div>
                                <div className="flex flex-col gap-4 my-2">
                                    <h3 className="text-black font-bold">Job Position\Role</h3>
                                    <Input
                                        onChange={(event) => {
                                            setJobPosition(event.target.value);
                                        }}
                                        placeholder="Ex.developer,tester..etc"
                                        required
                                    ></Input>

                                    <h3 className="text-black font-bold">
                                        Job Description in Short
                                    </h3>
                                    <Textarea
                                        onChange={(event) => {
                                            setJobDescription(event.target.value);
                                        }}
                                        placeholder="Ex.Angular,Node,React.js etc"
                                        required
                                    ></Textarea>

                                    <h3 className="text-black font-bold">
                                        Years Of Experience (in Numbers)
                                    </h3>
                                    <Input
                                        onChange={(event) => {
                                            setJobExperience(event.target.value);
                                        }}
                                        placeholder="Ex.5"
                                        type="number"
                                        required
                                    ></Input>
                                </div>
                                <div className="gap-10 flex justify-between my-5">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => {
                                            setOpen(false);
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-primary "
                                    >
                                        {loading ? (
                                            <>
                                                <LoaderCircle className="animate-spin"></LoaderCircle>
                                                Genarating Questions for {user.fullName}
                                            </>
                                        ) : (
                                            "Start Interview"
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddnewInterview;
