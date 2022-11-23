package main

import (
	"fmt"
	"os"
	"os/signal"

	gnet "github.com/panjf2000/gnet/v2"
)

// DatagramSize 网络交互数据报固定大小
const DatagramSize = 36

type NetHandler struct {
	*gnet.BuiltinEventEngine
	network, addr string
	action        bool
}

func (s *NetHandler) OnClose(c gnet.Conn, err error) (action gnet.Action) {
	action = gnet.Shutdown
	return
}
func (s *NetHandler) OnTraffic(c gnet.Conn) (action gnet.Action) {
	var data []byte
	data, err := c.Peek(-1)
	if err != nil {
		panic(err)
	}
	fmt.Println("===============", string(data), len(data))
	return gnet.None
}

// checkFrameLength 检验长度是否合法
func checkFrameLength(frame *[]byte) bool {
	return len(*frame) == DatagramSize
}
func main() {
	go gnet.Run(new(NetHandler), "udp://127.0.0.1:9991", gnet.WithMulticore(false))

	exitOnSignal()
}

// exitOnSignal 监听退出信号
func exitOnSignal() {
	quit := make(chan os.Signal)
	signal.Notify(quit, os.Interrupt)

	select {
	case <-quit:
		// nop
	}
}
