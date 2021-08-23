import { Button } from "@chakra-ui/button"
import { Container, Text, VStack } from "@chakra-ui/layout"
import { Box, Divider, FormControl, FormLabel, Heading, Link, Textarea, useToast } from "@chakra-ui/react"
import { Comment, Page, Project } from "@prisma/client"
import { useRouter } from "next/router"
import React from "react"
import { useMutation } from "react-query"
import { Head } from "../../components/Head"
import { CommentService } from "../../service/comment.service"
import { SecretKey, TokenService } from "../../service/token.service"
import { apiClient } from "../../utils.client"
import { prisma } from "../../utils.server"
import { ErrorCode } from "../error"

const approveOffer = async ({ token }) => {
  const res = await apiClient.post(`/open/approve?token=${token}`)
  return res.data
}

const appendReply = async ({  replyContent, token }) => {
  const res = await apiClient.post(`/open/approve?token=${token}`, {
    replyContent
  })
  return res.data
}

function ApprovePage(props: {
  offer: Comment & {
    page: Page & {
      project: Project
    }
  }
}) {

  const router = useRouter()
  const toast = useToast()

  const [replyContent, setReplyContent] = React.useState('')

  const appendReplyMutation = useMutation(appendReply, {
    onSuccess() {
      toast({
        title: 'Success',
        status: "success",
        position: 'top'
      })
      setReplyContent('')
    },
    onError() {
      toast({
        title: 'Something went wrong',
        status: "error",
        position: 'top'
      })
    }
  })
  const approveOfferMutation = useMutation(approveOffer, {
    onSuccess() {
      toast({
        title: 'Success',
        status: "success",
        position: 'top'
      })
      location.reload()
    },
    onError() {
      toast({
        title: 'Something went wrong',
        status: "error",
        position: 'top'
      })
    }
  })

  return (
    <>
      <Head title="Offer status changed!" />
      <Container mt={12} my={12}>
        <Heading mb={12}>
          Counter-Offer
        </Heading>
        <VStack alignItems="start" spacing={4}>
          <Text>New offer on project <strong>{props.offer.page.project.title}</strong>, page <Link fontWeight="bold" isExternal href={props.offer.page.url}>{props.offer.page.title || props.offer.page.slug}</Link></Text>
          <Text><strong>{props.offer.by_nickname}</strong> ({props.offer.by_email || 'Email not provided'})</Text>
          <Text whiteSpace="pre-wrap" as='pre' bgColor="gray.100" p={2} w="full">{props.offer.content}</Text>

          <Box>
            {
              props.offer.approved ? <Button disabled>Approved</Button> : <Button onClick={_ => {
                approveOfferMutation.mutate({
                  token: router.query.token as string
                })
              }} isLoading={approveOfferMutation.isLoading} colorScheme="telegram">
                Approve
          </Button>
            }
          </Box>

        </VStack>
      </Container>
    </>
  )
}

function redirectError(code: ErrorCode) {
  return {
    redirect: {
      destination: `/error?code=${code}`,
      permanent: false
    }
  }
}

export async function getServerSideProps(ctx) {

  const tokenService = new TokenService()
  const offerService = new CommentService(ctx.req)

  const { token } = ctx.query

  if (!token) {
    return redirectError(ErrorCode.INVALID_TOKEN)
  }

  let offerId

  try {
    offerId = tokenService.validate(token, SecretKey.ApproveComment).offerId
  } catch (e) {
    return redirectError(ErrorCode.INVALID_TOKEN)
  }


  const offer = await prisma.comment.findUnique({
    where: {
      id: offerId
    },
    select: {
      by_nickname: true,
      by_email: true,
      content: true,
      approved: true,
      page: {
        select: {
          title: true,
          slug: true,
          url: true,
          project: {
            select: {
              title: true
            }
          }
        }
      }
    }
  })

  return {
    props: {
      offer
    }
  }
}

export default ApprovePage