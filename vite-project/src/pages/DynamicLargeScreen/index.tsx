import * as datav from "@jiaminghi/data-view-react";
import { Flex } from "antd";

datav.BorderBox1;

const MainPage: React.FC = () => {


    return (
        <>
            {/* <datav.FullScreenContainer> */}
            <datav.BorderBox1 >
                <Flex style={{
                    display: 'flex',
                    justifyContent: 'space-between',  // 使子元素均匀分布
                    alignItems: 'center',             // 使子元素垂直居中对齐（可选）                // 父元素的宽度为其父元素的宽度
                }}>
                    {/* <datav.Loading>Loading...</datav.Loading> */}
                    {/* <datav.Decoration9 style={{ width: '150px', height: '150px' }}>66%</datav.Decoration9> */}
                    <datav.ActiveRingChart config={{
                        color: ['red', 'grey', 'blue', 'green', 'yellow'], activeTimeGap: 1000, data: [
                            {
                                name: '周口',
                                value: 55
                            },
                            {
                                name: '南阳',
                                value: 120
                            },
                            {
                                name: '西峡',
                                value: 78
                            },
                            {
                                name: '驻马店',
                                value: 66
                            },
                            {
                                name: '新乡',
                                value: 80
                            }
                        ]
                    }} style={{ width: '300px', height: '300px' }} />

                    <datav.CapsuleChart config={{
                        data: [
                            {
                                name: '南阳',
                                value: 167
                            },
                            {
                                name: '周口',
                                value: 67
                            },
                            {
                                name: '漯河',
                                value: 123
                            },
                            {
                                name: '郑州',
                                value: 55
                            },
                            {
                                name: '西峡',
                                value: 98
                            }
                        ]
                    }} style={{ width: 300, height: 300 }} />


                    <datav.WaterLevelPond config={{
                        data: [55],
                        shape: 'round'
                    }
                    } />
                </Flex>
            </datav.BorderBox1>
            {/* </datav.FullScreenContainer> */}
        </>
    );
};

export default MainPage;