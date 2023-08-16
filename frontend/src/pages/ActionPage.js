import { View, StyleSheet } from "react-native"
import { useState, useEffect } from 'react'
import TabNav from "@components/TabNav"
import MessageList from "./ActionTabs/MessageList"
import FriendPage from "./ActionTabs/FriendPage"
import Profile from "./ActionTabs/Profile"
import Error from "./Error"
import MsgIcon from "@assets/msgIcon.svg"
import FriendsIcon from "@assets/friendsIcon.svg"
import ProfileIcon from "@assets/profileIcon.svg"

export default function TabbedPage(){
    const pages = ["messageList", "friendsList", "profile"]
    const [page, setPage] = useState(pages[0])

    
    // tab icon setup
    const [active, setActive] = useState(0)
    const disabledColor = "#858585"
    const enabledColor = "white"
    const [msgColor, setMsgColor] = useState(enabledColor)
    const [friendsColor, setFriendsColor] = useState(disabledColor)
    const [profileColor, setProfileColor] = useState(disabledColor)
    const iconList = [
        <MsgIcon style={styles.icon} color={msgColor}/>, 
        <FriendsIcon style={styles.icon} color={friendsColor}/>, 
        <ProfileIcon style={styles.icon} color={profileColor}/>
    ]

    const iconSetters = [
        setMsgColor,
        setFriendsColor,
        setProfileColor
    ]

    useEffect(() => {
        setPage(pages[active])
        iconList.forEach((element, index) => {
            if (index == active){
                iconSetters[index](enabledColor)
            } else {
                iconSetters[index](disabledColor)
            }
        });
    }, [active])

    return (
        <View style={styles.container}>
            {(() => {
                switch(page){
                    case pages[0]: // messageList
                        return <MessageList />
                    case pages[1]: // friendsList
                        return <FriendPage />
                    case pages[2]: //profile page
                        return <Profile />
                    default: // error
                        return <Error />
                }
            })()}
            <TabNav setActive={setActive} pageList={pages} icons={iconList}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#141516",
        flex: 1
    },
    icon: {
        padding: 20,
        margin: 20,
    }
})