import React from 'react'
import Image from 'next/image'
import { AuthUserInfo, MembershipTypes } from '@metricsai/metrics-interfaces'

type Props = {
    row: {
        rowData: AuthUserInfo
    }
}
const AuthLecturerProfileRow = (Props: Props) => {
    const apiUri = process.env.NEXT_PUBLIC_API_URI;

    const { row } = Props
    const { rowData } = row;

    const [profile, setProfile] = React.useState<AuthUserInfo>({ ...rowData });

    const ref_isFellow = React.useRef<HTMLInputElement>(null);
    const ref_isFullProfessor = React.useRef<HTMLInputElement>(null);
    const ref_isReader = React.useRef<HTMLInputElement>(null);
    const ref_isPHD = React.useRef<HTMLInputElement>(null);
    const ref_membershipType = React.useRef<HTMLSelectElement>(null);

    const handleupdateByTarget = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        // switch
        switch (name) {

            case 'isFellow':
                setProfile({ ...profile, isFellow: ref_isFellow.current?.checked });
                break;
            case 'isFullProfessor':
                setProfile({ ...profile, isFullProfessor: ref_isFullProfessor.current?.checked });
                break;
            case 'isReader':
                setProfile({ ...profile, isReader: ref_isReader.current?.checked });
                break;
            case 'isPHD':
                setProfile({ ...profile, isPHD: ref_isPHD.current?.checked });
                break;
            case 'membershipType':
                setProfile({ ...profile, membershipType: ref_membershipType.current?.value as MembershipTypes });
                break;
            default:
                break;
        }
        processUpdates();
    };


    const processUpdates = async () => {
        // update Lectuere info here
        const update = await fetch(`${apiUri}lecturers/update/${rowData._id}/ajax`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                membershipType: profile.membershipType,
                isPHD: profile.isPHD,
                isReader: profile.isReader,
                isFullProfessor: profile.isFullProfessor,
                isFellow: profile.isFellow
            })
        });
        const updateResult = await update.json();
        console.log(updateResult);
    };

    return (
        <div className='m-1 min-h-[50px] relative' key={rowData._id}>
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-2 col-xl-2">
                    <div className='rounded-4 bg-gradient-to-t from-[#c5a9a9] to-[#fdeded] min-h-[50px] text-center items-center py-4'>
                        <button className='btn-primary p-2 rounded-4'>
                            <Image alt={`${rowData.fullname}`} src={rowData.picture} width={100} height={100} className='rounded-[50%] mx-auto' />
                        </button>
                        <p>
                            <span className='text-[#01579b] font-bold'>{rowData.fullname}</span><br />
                            <em>click to change photo</em>
                        </p>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl4 col-auto">
                            <div className='rounded-4 border border-green-600 min-h-[50px] p-2  bg-gradient-to-t from-[#ffffff] to-[#ece9e9] box-border shadow'>
                                <form action="/action_page.php">
                                    <div className="form-group my-1">
                                        <div className='text-gray-400 w-full border-b border-b-gray-300 pb-1 py-1'>Last Name: <span className='text-black float-right'>{rowData.lastname}</span></div>
                                        <div className='text-gray-400 w-full border-b border-b-gray-300 pb-1 py-1'>First Name: <span className='text-black float-right'>{rowData.firstname}</span></div>
                                        <div className='text-gray-400 w-full border-b border-b-gray-300 pb-1 py-1'>Email Address: <span className='text-black float-right'>{rowData.email}</span></div>
                                        <div className='text-gray-400 w-full border-b border-b-gray-300 pb-1 py-1'>Telephone Number: <span className='text-black float-right'>{rowData.mobile}</span></div>
                                        <div className='text-gray-400 w-full border-b border-b-gray-300 pb-1 py-1'>Gender: <span className='text-black float-right'>{rowData.gender}</span></div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl4 col-auto">
                            <div className='rounded-4 border border-green-600 min-h-[50px] p-2  bg-gradient-to-t from-[#ffffff] to-[#ece9e9] box-border shadow'>
                                <form action="/action_page.php">
                                    <div className="form-group my-1">

                                        <div className='text-gray-400 w-full border-b border-b-gray-300 py-2 relative'>International Lecturer:
                                            <div className="form-check form-switch float-right absolute top-0 right-0">
                                                <input
                                                    ref={ref_membershipType}
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="membershipType"
                                                    name="membershipType"
                                                    defaultChecked={profile.membershipType === MembershipTypes.INTERNATIONAL}
                                                    onChange={
                                                        (event) => {
                                                            event.preventDefault();
                                                            const { name, checked } = event.target;
                                                            const value = checked ? MembershipTypes.INTERNATIONAL : MembershipTypes.LOCAL;
                                                            setProfile({
                                                                ...profile,
                                                                membershipType: value
                                                            });
                                                            processUpdates();
                                                        }
                                                    }
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="membershipType"
                                                />
                                            </div>
                                        </div>

                                        <div className='text-gray-400 w-full border-b border-b-gray-300 py-2 relative'>PHD Lecturer:
                                            <div className="form-check form-switch float-right absolute top-0 right-0">
                                                <input
                                                    ref={ref_isPHD}
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="isPHD"
                                                    name='isPHD'
                                                    defaultChecked={profile.isPHD}
                                                    onChange={handleupdateByTarget}
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="isPHD"
                                                />
                                            </div>
                                        </div>

                                        <div className='text-gray-400 w-full border-b border-b-gray-300 py-2 relative'>Reading Lecturer:
                                            <div className="form-check form-switch float-right absolute top-0 right-0">
                                                <input
                                                    ref={ref_isReader}
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="isReader"
                                                    name="isReader"
                                                    defaultChecked={profile.isReader}
                                                    onChange={handleupdateByTarget}
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="isReader"
                                                />
                                            </div>
                                        </div>

                                        <div className='text-gray-400 w-full border-b border-b-gray-300 py-2 relative'>Fellowship Lecturer:
                                            <div className="form-check form-switch float-right absolute top-0 right-0">
                                                <input
                                                    ref={ref_isFellow}
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="isFellow"
                                                    name='isFellow'
                                                    defaultChecked={profile.isFellow}
                                                    onChange={handleupdateByTarget}
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="isFellow"
                                                />
                                            </div>
                                        </div>

                                        <div className='text-gray-400 w-full border-b border-b-gray-300 py-2 relative'>Full Professor:
                                            <div className="form-check form-switch float-right absolute top-0 right-0">
                                                <input
                                                    ref={ref_isFullProfessor}
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="isFullProfessor"
                                                    name="isFullProfessor"
                                                    defaultChecked={profile.isFullProfessor}
                                                    onChange={handleupdateByTarget}
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="isFullProfessor"
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    )
}

export default AuthLecturerProfileRow