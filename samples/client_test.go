package main

import (
	"fmt"
	"net"
	"testing"

	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
)
// udp client
func TestClient(t *testing.T) {
	svrAddr, err := net.ResolveUDPAddr("udp", ":8080")
	assert.NoError(t, err)
	fmt.Println(svrAddr)
	conn, err := net.DialUDP("udp", nil, svrAddr)
	assert.NoError(t, err)

	for i := 0; i < 100; i++ {
		_, err := conn.Write(createDatagram(i))
		assert.NoError(t, err)
	}

	fmt.Println("send end!")
}

// createDatagram 创建数据报，数据报之间以第一个字节来区别
func createDatagram(index int) []byte {
	// result := make([]byte, DatagramSize, DatagramSize)
	result := uuid.New()
	return []byte(result.String())
}