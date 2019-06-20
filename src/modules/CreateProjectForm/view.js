import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Form, Field, withFormik, FieldArray } from 'formik'
import { message, Button, Select } from 'antd'
import { Box } from '../../components/Box'
import { Text } from '../../components/Text'
import { Grid } from '../../components/Grid'
import { Flex } from '../../components/Flex'

const CreateProjectFormViewComponent = props => (
  <Form>
    <FieldArray
      name="availabilityList"
      render={arrayHelpers => (
        <div>
          {props.values.availabilityList.map((availability, index) => (
            <Box key={index} mb={100}>
              <Text fontSize={30} color="#000000">
                hello, is this working?
              </Text>
              {availability.isOpen ? (
                <Fragment>
                  <Field
                    name={`availabilityList.${index}.selectedLocations`}
                    placeholder="Selected Locations"
                    component={props => <Select />}
                  />
                  <Box mb={15}>
                    <Text
                      fontSize={1}
                      fontWeight="500"
                      letterSpacing="-0.4px"
                      color="text.black"
                      mb="10px"
                    >
                      Repeat on
                    </Text>
                  </Box>
                  <Grid
                    gridTemplateColumns={['100%', '', `64px 150px 64px 150px`]}
                  >
                    <Text
                      fontSize={1}
                      fontWeight="500"
                      letterSpacing="-0.4px"
                      color="text.black"
                      mt={[0, '', 20]}
                      mb={10}
                    >
                      From
                    </Text>

                    <Text
                      fontSize={1}
                      fontWeight="500"
                      letterSpacing="-0.4px"
                      color="text.black"
                      mt={[0, '', 20]}
                      textAlign={['left', '', 'center']}
                      mb={10}
                    >
                      to
                    </Text>
                  </Grid>
                </Fragment>
              ) : (
                <Button
                  type="ghost"
                  height="auto"
                  onClick={() => {
                    props.values.availabilityList.forEach(
                      (availability, index2) => {
                        if (index === index2) {
                          props.setFieldValue(
                            `availabilityList.${index2}.isOpen`,
                            true,
                          )
                        } else {
                          props.setFieldValue(
                            `availabilityList.${index2}.isOpen`,
                            false,
                          )
                        }
                      },
                    )
                  }}
                >
                  <Box textAlign="left">
                    {props.values.availabilityList[index].selectedLocations && (
                      <Text
                        fontSize={3}
                        color="text.blue"
                        fontWeight="500"
                        mb="7px"
                      ></Text>
                    )}
                  </Box>
                </Button>
              )}
            </Box>
          ))}

          <Button type="ghost" mt={16} ml={30}>
            <Flex
              height="22px"
              onClick={() => {
                props.values.availabilityList.forEach((availability, index) => {
                  props.setFieldValue(`availabilityList.${index}.isOpen`, false)
                })

                // arrayHelpers.push({
                //   startTime: moment()
                //     .startOf('hour')
                //     .hour(8),
                //   endTime: moment()
                //     .startOf('hour')
                //     .hour(15),
                //   range: [
                //     moment()
                //       .startOf('day')
                //       .add(1, 'day'),
                //     null,
                //   ],
                //   selectedLocations: '',
                //   isOpen: true,
                //   days: {},
                // })
              }}
              alignItems="center"
            >
              <Text fontSize={[1, '', 3]} letterSpacing="-0.5px">
                Add another availability
              </Text>
            </Flex>
          </Button>
        </div>
      )}
    />

    <Flex width="100%" justifyContent="center" mt={28}>
      <Button
        htmlType="submit"
        loading={props.isSubmitting}
        width={329}
        height={50}
      >
        Save changes
      </Button>
    </Flex>
  </Form>
)

CreateProjectFormViewComponent.defaultProps = {
  onSuccess: async () => {},
}

CreateProjectFormViewComponent.propTypes = {
  onSuccess: PropTypes.func.isRequired,
}

export const CreateProjectFormView = withFormik({
  mapPropsToValues: props => {
    const { data } = props
    return { ...data }
  },
  handleSubmit: async (values, actions) => {
    const result = await actions.props.onSuccess(values)
    actions.setSubmitting(false)

    if (result) {
      message.success('Availability settings successfully updated!')
    }
  },
})(CreateProjectFormViewComponent)
