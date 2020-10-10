import React, { useState } from 'react';
import { TabBar } from 'antd-mobile';
import { PlusCircleOutlined, LineChartOutlined } from '@ant-design/icons';
import AddPage from '../pages/add';
import RecordPage from '../pages/record';
import { BodyDataContext } from '../context';
import { themeLight } from '../colors/color';
import './style.styl';

const PREFIX_CLASS = 'layout';

function AppLayout() {
	const [selectedTab, setSelectedTab] = useState('Record');
	const [bodyData, setBodyData] = useState([]);

	return (
		<BodyDataContext.Provider value={{ bodyData, setBodyData }}>
			<div className={PREFIX_CLASS}>
				<TabBar
					barTintColor={themeLight.btnBg2}
					tintColor="black"
					unselectedTintColor={themeLight.btnBg}
				>
					<TabBar.Item
						title="Record"
						key="Record"
						selected={selectedTab === 'Record'}
						onPress={() => setSelectedTab('Record')}
						icon={<LineChartOutlined/>}
						selectedIcon={<LineChartOutlined/>}
					>
						<RecordPage/>
					</TabBar.Item>
					<TabBar.Item
						title="Add"
						key="Add"
						selected={selectedTab === 'Add'}
						onPress={() => setSelectedTab('Add')}
						icon={<PlusCircleOutlined/>}
						selectedIcon={<PlusCircleOutlined/>}
					>
						<AddPage onNavigate={setSelectedTab}/>
					</TabBar.Item>
				</TabBar>
			</div>
		</BodyDataContext.Provider>
	);
}

export default AppLayout;
