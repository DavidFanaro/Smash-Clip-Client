import { Avatar } from '@chakra-ui/avatar'
import { HStack, Text } from '@chakra-ui/layout'
import React from 'react'
import { user } from '../Interfaces/user'



export default function ProfileBadge(props: { user:user}) {
  return (
    <HStack spacing='3'>
      <Text fontSize='large' fontWeight='bold'>
        {props.user.displayName}
      </Text>
      <Avatar src={props.user.profileUrl}/>
    </HStack>
  )
}
